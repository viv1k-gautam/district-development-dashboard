# Deploying the dashboard on PythonAnywhere Free

This configuration runs the Vite frontend and Django API in one Django web app. It uses the free account's persistent SQLite storage and `username.pythonanywhere.com` address. Free accounts are limited to one web app and have modest CPU and bandwidth limits.

## 1. Build and publish the frontend bundle

From the repository root, run:

```powershell
cd frontend
npm ci
$env:VITE_BASE_PATH = "/static/frontend/"
$env:VITE_BUILD_DIR = "../backend/static/frontend"
npm run build
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_BUILD_DIR
cd ..
```

The build writes `backend/static/frontend/`. Commit and push that generated folder along with source changes, then deploy by pulling the repository on PythonAnywhere.

## 2. Create the PythonAnywhere account and web app

Create/sign in to a PythonAnywhere account. In **Web**, choose **Add a new web app → Manual configuration → Python 3.13**. Note the account username and the WSGI configuration file path shown on the Web tab.

## 3. Download and configure the project

Open a Bash console and run (replace `<username>` with your PythonAnywhere username):

```bash
git clone https://github.com/viv1k-gautam/district-development-dashboard.git
cd district-development-dashboard/backend
python3.13 -m venv ~/.virtualenvs/ddad
~/.virtualenvs/ddad/bin/pip install -r requirements.txt
~/.virtualenvs/ddad/bin/python manage.py migrate
~/.virtualenvs/ddad/bin/python manage.py collectstatic --noinput
```

On the Web tab, set the virtualenv to `/home/<username>/.virtualenvs/ddad`.

## 4. Configure the WSGI file

Open the WSGI file linked from the Web tab and replace its contents with the following, updating the username and secret:

```python
import os
import sys

project = "/home/<username>/district-development-dashboard/backend"
if project not in sys.path:
    sys.path.insert(0, project)

os.environ["DJANGO_SETTINGS_MODULE"] = "config.settings"
os.environ["DJANGO_DEBUG"] = "false"
os.environ["DJANGO_ALLOWED_HOSTS"] = "<username>.pythonanywhere.com"
os.environ["DJANGO_SECRET_KEY"] = "PASTE-A-NEW-RANDOM-SECRET-HERE"

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

Generate a random secret in a Bash console with:

```bash
~/.virtualenvs/ddad/bin/python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Paste the generated value into your private WSGI file; do not commit it to GitHub or share it in chat.

## 5. Map static files and reload

On the Web tab, add a **Static files** mapping:

- URL: `/static/`
- Directory: `/home/<username>/district-development-dashboard/backend/staticfiles`

Click **Reload**, then open `https://<username>.pythonanywhere.com/`. Create an account in the dashboard and check `/api/health/` returns `{"status":"ok"}`.

For future updates, pull the latest repository in the Bash console, install any dependency changes, run migrations and `collectstatic` again, and click **Reload**. Rebuild and commit the frontend bundle after frontend source changes.
