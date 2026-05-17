# Monitoring and Observability

## Services Used

- Azure Monitor
- Log Analytics Workspace
- Application Insights

## Current Integration

- Terraform provisions Log Analytics and Application Insights.
- AKS cluster is onboarded to Log Analytics via `oms_agent`.
- Backend auto-initializes Application Insights when `APPINSIGHTS_CONNECTION_STRING` is set.

## Alerts to Configure

1. Backend 5xx error rate > 5% for 5 minutes.
2. AKS node CPU > 80% for 10 minutes.
3. Pod restart count > threshold.
4. Monthly cost budget threshold alerts (50/80/100).

## Dashboard Suggestions

- Request rate, latency, and failed request trend.
- Node utilization and pod health.
- Deployment frequency and change failure markers.
