# District Development Data Analytics Dashboard

A React + Django prototype based on the project synopsis. The UI includes a five-sector district dashboard, district comparisons, relative composite scoring, rankings, indicator catalog, trend views, and source notes.

## Run locally

1. Backend: `cd backend`, activate the repository `.venv`, install `Django djangorestframework djangorestframework-simplejwt django-cors-headers`, run `python manage.py migrate`, then `python manage.py runserver`.
2. Frontend: in another terminal, `cd frontend`, run `npm install` once and `npm run dev`.
3. Open the Vite URL and create an account or sign in.

## Data status

All seeded dashboard observations, district metadata, and historical points are illustrative demonstration data, not verified government statistics. The source register records candidate public datasets only; it does not claim that those datasets have been ingested. Do not use the sample scores for planning or policy decisions.

## Composite Development Index

Indicators are min-max normalized across the six demonstration districts. Higher-is-better indicators use `(x - min) / (max - min) * 100`; lower-is-better indicators reverse the result. Indicator scores are averaged within each sector, and the five sector means have equal weight in the composite. Thus scores and ranks are peer-set dependent, and the result is not an official DDI.

## CSV integration contract

The intended long format is `district_code,district,state,year,sector,indicator,value,unit,source,published_at`. A production ETL pipeline still needs source validation, district/LGD code reconciliation, boundary versioning, missing-value rules, outlier review, and auditable ingestion. Forecasting, persistent indicator storage, and official boundary map rendering remain future implementation work.
