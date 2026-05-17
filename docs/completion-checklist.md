# 100% Completion Checklist

Use this checklist to close the final runtime steps in Azure and mark the project complete.

## 1) Terraform Provisioning

- Copy `infra/terraform/envs/dev/terraform.tfvars.example` to `terraform.tfvars`.
- Fill `acr_name`, `key_vault_name`, `tenant_id`, and `budget_contact_emails`.
- Run:
  - `terraform init`
  - `terraform plan`
  - `terraform apply`

Expected resources include AKS, ACR, VNet/Subnet/NSG, Key Vault, App Insights, Log Analytics, alert action group, and budget alerts.

## 2) Azure DevOps Pipeline Variables

Set these in pipelines:

- `acrName`
- `acrLoginServer`
- `keyVaultName`
- `tenantId`
- service connections:
  - `acr-service-connection`
  - `aks-service-connection`

## 3) CI Validation

- Trigger CI on `develop` or `main`.
- Confirm:
  - frontend lint/test/build pass
  - backend lint/test pass
  - JUnit test reports published
  - artifacts published (`k8s-manifests`, `terraform-definitions`)
  - Docker images pushed to ACR
  - Trivy scan executed

## 4) CD Validation

- Trigger CD from CI pipeline completion.
- Confirm staging deployment success.
- Approve manual gate.
- Confirm production deployment success.

## 5) AKS Runtime Validation

- Verify namespaces, pods, services:
  - `kubectl get ns`
  - `kubectl get pods -n staging`
  - `kubectl get pods -n production`
- Confirm secret sync from Key Vault:
  - `kubectl get secret backend-secrets -n staging`
  - `kubectl get secret backend-secrets -n production`

## 6) Monitoring and Cost Evidence

- Capture screenshots:
  - App Insights request/failed request charts
  - Azure Monitor alerts
  - Cost Management budget and threshold alerts

## 7) Final Submission Pack

- Repo URL
- Architecture diagram export
- Pipeline run screenshots
- Terraform apply output screenshots
- Monitoring/cost screenshots
- 10-15 minute demo video (use `docs/final-presentation-outline.md`)
