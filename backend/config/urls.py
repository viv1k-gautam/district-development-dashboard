from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from accounts.views import HealthView

frontend_app = TemplateView.as_view(template_name="frontend/index.html")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", HealthView.as_view()),
    path("api/auth/", include("accounts.urls")),
    path("", frontend_app, name="frontend-home"),
    path("<path:frontend_path>", frontend_app, name="frontend-route"),
]
