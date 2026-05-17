# E-Commerce CI/CD Capstone Project Report

## 1) Project Overview

This project implements a complete DevOps lifecycle for a modular e-commerce platform using Azure services and modern DevOps practices.  
The application consists of two independent services:

- `frontend`: React (Vite) web application
- `backend`: Node.js (Express) API

The objective is to automate build, test, security checks, deployment, observability, and cost governance from source code to production on AKS.

---

## 2) Architecture Diagram

- Editable source: `docs/architecture.drawio`
- Export this as PNG/PDF and attach to submission.

Architecture includes:

- Source Control: GitHub (feature/develop/main workflow)
- CI/CD: Azure DevOps Pipelines
- Registry: Azure Container Registry (ACR)
- Orchestration: Azure Kubernetes Service (AKS)
- Secrets: Azure Key Vault + Secrets Store CSI Driver
- Monitoring: Azure Monitor + Log Analytics + Application Insights
- Cost Governance: Azure Cost Management budgets and alerts
- IaC: Terraform

---

## 3) Step-by-Step Setup Instructions

### 3.1 Source Control and Git Workflow

1. Create repository on GitHub/Azure Repos.
2. Push code with structure from this repository.
3. Use branching strategy:
   - `main` for production
   - `develop` for integration
   - `feature/*` for new changes
4. Configure branch protection:
   - PR required
   - minimum 1 reviewer
   - required CI checks
5. Use PR template at `.github/pull_request_template.md`.

Reference docs:
- `docs/branching-strategy.md`
- `docs/branch-protection-checklist.md`

### 3.2 CI/CD Pipelines (Azure DevOps)

1. Create two pipelines in Azure DevOps:
   - CI from `azure-pipelines.yml`
   - CD from `azure-pipelines-cd.yml`
2. Create service connections:
   - `acr-service-connection`
   - `aks-service-connection`
3. Set pipeline variables:
   - `acrName`
   - `acrLoginServer`
   - `aksResourceGroup`
   - `aksClusterName`
   - `keyVaultName`
   - `tenantId`
4. Configure environment approvals:
   - `ecommerce-staging`
   - `ecommerce-production` with manual approval gate

Reference: `docs/pipeline-setup.md`

### 3.3 Containerization and AKS Deployment

1. Build images from:
   - `frontend/Dockerfile`
   - `backend/Dockerfile`
2. Push images to ACR via CI.
3. Deploy Kubernetes manifests:
   - namespaces: `k8s/namespaces.yml`
   - staging: `k8s/staging/*`
   - production: `k8s/production/*`
4. Verify rollout:
   - `kubectl get pods -n staging`
   - `kubectl get pods -n production`

### 3.4 Infrastructure Automation (Terraform)

Terraform code is under `infra/terraform/` and provisions:

- Resource Group
- VNet, Subnet, NSG
- AKS
- ACR
- Key Vault
- Log Analytics
- Application Insights
- Cost budget and alert primitives

Execution:

```bash
cd infra/terraform/envs/dev
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

### 3.5 Secrets Management and Security (Key Vault)

1. Terraform provisions Key Vault.
2. AKS accesses Key Vault secrets through Secrets Store CSI.
3. `SecretProviderClass` manifests:
   - `k8s/staging/secret-provider-class.yml`
   - `k8s/production/secret-provider-class.yml`
4. Backend reads secret `APPINSIGHTS_CONNECTION_STRING`.
5. Security hardening includes:
   - Pod security labels (baseline/restricted)
   - NetworkPolicy
   - `allowPrivilegeEscalation: false`
   - Trivy image scan in CI

Reference: `docs/security.md`

### 3.6 Monitoring and Alerting

Monitoring integration includes:

- AKS to Log Analytics
- Application Insights telemetry from backend
- Azure Monitor alerts and dashboard recommendations

Reference: `docs/monitoring-observability.md`

### 3.7 Cost Management and Budgets

- Budget and email notifications are codified in Terraform.
- Azure Cost Management dashboard and threshold alerts (50/80/100) should be configured and screenshotted.

Reference:
- `docs/cost-estimate.md`
- `docs/completion-checklist.md`

---

## 4) Major Application Features and Pipeline Stages

### App Features

- Product list API (`/api/products`)
- Health endpoint (`/api/health`)
- Frontend product rendering with API error handling

### CI Stages

1. Frontend: install, lint, test, build
2. Backend: install, lint, test
3. Publish test reports (JUnit) and pipeline artifacts
4. Build and push Docker images to ACR
5. Security scan with Trivy

### CD Stages

1. Deploy to staging namespace in AKS
2. Manual approval gate
3. Deploy to production namespace

---

## 5) Code Snippets (Required)

### 5.1 Dockerfile Snippet (Frontend)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### 5.2 Azure DevOps CI YAML Snippet

```yaml
trigger:
  branches:
    include: [develop, main]

stages:
  - stage: BuildAndTest
    jobs:
      - job: Frontend
        steps:
          - script: |
              cd frontend
              npm ci
              npm run lint
              npm run test
              npm run build
```

### 5.3 Terraform Snippet (AKS + ACR)

```hcl
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  dns_prefix          = var.aks_name
}
```

### 5.4 Kubernetes Deployment Snippet (Backend)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: staging
spec:
  template:
    spec:
      containers:
        - name: backend
          image: youracrname.azurecr.io/backend:latest
          readinessProbe:
            httpGet:
              path: /api/health
              port: 5000
```

---

## 6) Azure Pricing Calculator Cost Estimation

Use Azure Pricing Calculator and include screenshot/PDF with per-service breakup:

- AKS (node VM size/count)
- ACR (Basic/Standard)
- Log Analytics ingestion
- Application Insights telemetry
- Key Vault operations
- Load Balancer and egress

Fill this table in report:

| Service | Tier/SKU | Monthly Estimate (USD/INR) | Notes |
|---|---|---:|---|
| AKS Node Pool | Standard_B2s x 1 | [FILL] | 730 hours |
| ACR | Basic | [FILL] | image storage + pulls |
| Log Analytics | PerGB2018 | [FILL] | ingestion estimate |
| Application Insights | Pay-as-you-go | [FILL] | request volume based |
| Key Vault | Standard | [FILL] | operations estimate |
| Networking | LB + Egress | [FILL] | outbound traffic |
| **Total** |  | **[FILL]** |  |

Attach:
- pricing export PDF or screenshots

---

## 7) Security Configurations and Performance Tuning

### Security Implemented

- No hardcoded secrets in code
- Key Vault + CSI secret sync in AKS
- Pod Security labels
- NetworkPolicy for backend access restriction
- Container security context restrictions
- Trivy scan in CI
- Manual approval gate before production

### Performance and Reliability Strategies

- Separate frontend/backend scaling units
- Health checks (readiness/liveness probes)
- Observability through App Insights and Log Analytics
- Staging-first deployment and manual promotion
- Budget monitoring for cost/performance balance

---

## 8) Repository Link and Evidence

Fill below before submission:

- Repository URL: https://github.com/balvindersingh07/ecommerce-devops2
- CI run URL/screenshots: `[FILL]`
- CD run URL/screenshots: `[FILL]`
- AKS deployment evidence: `[FILL]`
- Monitor dashboard evidence: `[FILL]`
- Cost dashboard evidence: `[FILL]`

---

## 9) Conclusion

This project demonstrates a practical DevOps implementation for an e-commerce platform covering automated CI/CD, containerization, AKS deployment, Terraform-based infrastructure, security controls, observability, and cost governance.  
The solution follows production-oriented practices including branch protection, quality gates, security scanning, staging-to-production promotion, and operational monitoring.
