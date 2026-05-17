# E-Commerce DevOps Capstone Starter

## GitHub repository link (submission)

Push kar baad **eh placeholder apna real URL naal badlo**:

**https://github.com/balvindersingh07/ecommerce-devops2**

---

This repository provides a starter implementation for an end-to-end DevOps capstone using:

- Node.js backend + React frontend
- Docker + Docker Compose
- Azure DevOps CI/CD pipelines
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Terraform infrastructure as code
- Azure Key Vault + basic security scanning
- Azure Monitor and cost governance guidance

## Repository Structure

- `frontend/` React app (Vite)
- `backend/` Node.js API (Express)
- `docker-compose.yml` local multi-service run
- `k8s/` Kubernetes manifests for staging and production
- `pipelines/` Azure DevOps YAML pipelines
- `infra/terraform/` IaC templates for Azure resources
- `docs/` architecture, branching, and cost planning docs

## Quick Start (Local)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

### Frontend routes (SPA)

| Path | Page |
|------|------|
| `/` | Home — hero, categories, trending carousel, promos |
| `/products` | Product listing — filters sidebar, 3D-style cards |
| `/product/:id` | Product detail — large preview, add to cart, reviews |
| `/cart` | Cart — qty controls, animated summary |
| `/checkout` | Checkout — shipping → payment → review steps |
| `/admin` | Admin dashboard — KPIs, charts, product table |

### 3) Docker Compose

Build context is the **repository root** (images include `shared/catalog.json`).

```bash
docker compose up --build
```

Frontend NGINX proxies `/api/*` to the backend container, so the browser calls same-origin `/api/products`.

**Port 5000 already in use:** Stop the local backend (`npm run dev` in `backend/`) before starting Compose, **or** copy `.env.example` to `.env` at the repo root and set `BACKEND_HOST_PORT=5001`, then run `docker compose up --build` again. On Windows you can check what holds the port: `netstat -ano | findstr :5000`.

## CI/CD Overview

- CI pipeline (`pipelines/ci.yml`) runs lint, tests, and container image builds on `develop` and `main`.
- CD pipeline (`pipelines/cd.yml`) deploys to AKS staging and production with an approval gate.
- Azure DevOps entry files: `azure-pipelines.yml` (CI) and `azure-pipelines-cd.yml` (CD).
- Full setup instructions: `docs/pipeline-setup.md`.

## Terraform Usage

Use the environment folder under `infra/terraform/envs/` to initialize and apply.

```bash
cd infra/terraform/envs/dev
terraform init
terraform plan
terraform apply
```

## Next Steps

1. Create Azure service connections in Azure DevOps.
2. Set pipeline variables (ACR/AKS names, subscription, resource group).
3. Apply Terraform for your target environment.
4. Run CI, then CD to staging, approve, and promote to production.

## Submission Artifacts Included

- Architecture description: `docs/architecture.md`
- Editable architecture diagram source: `docs/architecture.drawio`
- Branching workflow: `docs/branching-strategy.md`
- Branch protection checklist: `docs/branch-protection-checklist.md`
- Cost planning template: `docs/cost-estimate.md`
- Security implementation: `docs/security.md`
- Monitoring plan: `docs/monitoring-observability.md`
- Final presentation script: `docs/final-presentation-outline.md`
- Final completion checklist: `docs/completion-checklist.md`
- Submission-ready project report: `docs/PROJECT_REPORT.md`
- 15-20 min video script: `docs/VIDEO_WALKTHROUGH_SCRIPT.md`
- **Way-wise manual steps (Azure/Jenkins/Git — portal work):** `docs/MANUAL_STEPS_WAY_WISE.md`
- Jenkins CI alternative: `Jenkinsfile`
- ARM template stub (optional vs Terraform): `infra/arm/resource-group-scope.json`
- PR template: `.github/pull_request_template.md`
- **Submission URLs placeholder:** `docs/SUBMISSION_LINKS.md`

## Project Phase Mapping

- Phase 1: `docs/architecture.md`, `docs/architecture.drawio`, `docs/cost-estimate.md`
- Phase 2: `.github/pull_request_template.md`, `docs/branching-strategy.md`, `docs/branch-protection-checklist.md`
- Phase 3: `pipelines/ci.yml` + frontend/backend lint and tests
- Phase 4: frontend/backend `Dockerfile` + `docker-compose.yml`
- Phase 5: `pipelines/cd.yml` + `k8s/` manifests
- Phase 6: `infra/terraform/` with AKS, ACR, VNet, NSG, Key Vault, monitoring
- Phase 7: `k8s/*/secret-provider-class.yml`, `k8s/*/network-policy.yml`, `docs/security.md`
- Phase 8: `docs/monitoring-observability.md`, `docs/cost-estimate.md`
