# Manual Steps (Way-Wise) — Project Complete Karan Layi

Eh document **coding jo repo ch pehla hi hai** te **Azure/Jenkins/GitHub portal te tusi khud karoge kaam** nu alag karke dinda hai.  
Coding complete = repo files. **Project 100% submit** = eh manual steps + screenshots/video.

---

## Part A — Coding status (already in repo)

| Requirement | Repo location |
|-------------|----------------|
| Modular React frontend + Node backend | `frontend/`, `backend/` |
| Dockerfiles | `frontend/Dockerfile`, `backend/Dockerfile` |
| Docker Compose | `docker-compose.yml` |
| Azure DevOps CI | `azure-pipelines.yml` → `pipelines/ci.yml` |
| Azure DevOps CD | `azure-pipelines-cd.yml` → `pipelines/cd.yml` |
| Jenkins CI (alternative) | `Jenkinsfile` |
| AKS manifests | `k8s/` |
| Terraform IaC | `infra/terraform/` |
| ARM sample (stub) | `infra/arm/` |
| Project report draft | `docs/PROJECT_REPORT.md` |
| Video script | `docs/VIDEO_WALKTHROUGH_SCRIPT.md` |

---

## Part B — Way-wise manual checklist (Azure + Git)

### Phase 1 — Planning & design (manual evidence)

1. Azure Pricing Calculator kholo: https://azure.microsoft.com/pricing/calculator/
2. Apne scenario layi add karo: **AKS**, **ACR**, **Log Analytics**, **App Insights**, **Key Vault**, **Bandwidth/LB** (estimate).
3. **Export PDF** ya screenshots lo — report ch paste karo (`docs/PROJECT_REPORT.md` table fill karo).
4. `docs/architecture.drawio` open karke diagram **PNG/PDF export** karo — presentation/report ch lagao.

---

### Phase 2 — Source control & Git workflow

1. **GitHub** (ya Azure Repos) te empty repo banao / existing push karo.
2. Local: `git init` (if needed), `git remote add origin <url>`, `develop` te `main` branches banao.
3. GitHub repo **Settings → Branches → Branch protection rules**:
   - `main` / `develop`: PR required, 1 reviewer, status checks (jab CI lag jaye).
4. **Azure DevOps path**: Project banao → Repos → code push → Branch policies same idea.
5. **Jenkins path**: GitHub repo → Settings → Webhooks → Payload URL = `https://<jenkins>/github-webhook/` (job type Multibranch ya pipeline trigger as per Jenkins setup).

---

### Phase 3 — CI pipeline (Azure DevOps)

1. Azure DevOps → **Pipelines → New pipeline** → GitHub/Azure Repos select karo.
2. **CI pipeline** pick karo: existing YAML use karo → path **`azure-pipelines.yml`**.
3. **Service connection** banao **ACR** layi:
   - Project Settings → Service connections → Docker Registry → Azure Container Registry → name: `acr-service-connection` (same as YAML).
4. Pipeline **Variables** set karo (Variables tab):
   - `acrName` = thoda ACR naam (without `.azurecr.io`)
5. First run fail ho sakda hai jab tak ACR Terraform na baneya — normal hai. Pehla Phase 6 (Terraform) kar sakde ho.

---

### Phase 4 — Docker local verify (optional but recommended)

1. Machine te Docker Desktop install.
2. Repo root: `docker compose up --build`
3. Browser: frontend port (compose according), backend health check — screenshots lo.

---

### Phase 5 — Azure infrastructure (Terraform) — manual Azure login

1. Machine te **Azure CLI** + **Terraform** install karo.
2. `az login` → subscription select karo.
3. `cd infra/terraform/envs/dev`
4. `copy terraform.tfvars.example terraform.tfvars` (Windows: `copy`)
5. `terraform.tfvars` edit:
   - `acr_name`, `key_vault_name`, `tenant_id`, `budget_contact_emails`
   - Names globally unique hon — Azure naming rules follow karo.
6. `terraform init` → `terraform plan` → `terraform apply`
7. Outputs note karo: ACR login server, Key Vault name, AKS name.

---

### Phase 6 — Azure DevOps service connections (post-Terraform)

1. **Kubernetes service connection** `aks-service-connection`:
   - Azure subscription → pick RG → pick AKS cluster → save.
2. Pipeline variables update karo **CD** layi:
   - `acrLoginServer` = `<acrName>.azurecr.io`
   - `aksResourceGroup`, `aksClusterName` = Terraform outputs de according
   - `keyVaultName`, `tenantId`
3. **Environments** banao:
   - `ecommerce-staging`, `ecommerce-production`
   - Production environment te **Approval** add karo (manual gate).

---

### Phase 7 — AKS prerequisites (Secrets Store CSI)

1. AKS cluster te **Secrets Store CSI Driver** + **Azure Key Vault provider** enable/install karo  
   (Azure docs: “Secrets Store CSI driver on AKS”).
2. Terraform ne Key Vault secret store kita — verify Key Vault ch secret `appInsightsConnectionString`.
3. Pehla deploy: `kubectl apply -f k8s/namespaces.yml` (optional — CD vich ho janda hai).
4. CD pipeline run karo — staging pods check: `kubectl get pods -n staging`.

---

### Phase 8 — CD pipeline (Azure DevOps)

1. **Second pipeline** create karo → YAML path **`azure-pipelines-cd.yml`**.
2. **Resources** tab / pipeline settings: CI pipeline nu source name match karo (`ci-pipeline` — yaml ch `resources.pipelines[].source` same as CI pipeline **name** in Azure DevOps — edit YAML if names differ).
3. CD run → staging success → **manual approve** → production deploy.
4. LoadBalancer IP/browser test — screenshots.

---

### Jenkins alternative (agar college Jenkins mandate kare)

1. Jenkins te **Pipeline** job → SCM → Git repo URL → Script Path `Jenkinsfile`.
2. Credentials add karo:
   - Id `acr-registry-credentials` — ACR Docker username/password (ya SP token).
   - Environment variable `ACR_NAME` job ch set karo.
3. GitHub webhook enable (Part B Phase 2 step 5).
4. Build run — Docker stage tabhi chalega jab credentials + ACR sahi hon.

---

### Monitoring & cost (manual portal)

1. Azure Portal → **Monitor** → dashboards — App Insights / Log Analytics charts screenshot.
2. **Cost Management + Billing** → Budget create → 50/80/100% alerts — screenshots.
3. Alerts (Terraform ne kuj seedha bhi deploy ho sakda hai) — verify email notifications.

---

### Final submission package

1. **GitHub link** repo da — `README.md` header + `docs/SUBMISSION_LINKS.md` + `PROJECT_REPORT.md` Section 8 ch apna real URL paste karo (`YOUR_USERNAME` replace).
2. **PROJECT_REPORT.pdf** — `docs/PROJECT_REPORT.md` edit karke Word/PDF export.
3. **Pricing Calculator** PDF attach.
4. **Video** 15–20 min — `docs/VIDEO_WALKTHROUGH_SCRIPT.md` follow karo.
5. Zip optional: pipeline run logs screenshots + architecture PNG.

---

## Quick order (recommended)

1. Terraform apply (infra)  
2. Azure DevOps service connections + variables  
3. CI pipeline green  
4. CD pipeline staging → approve → prod  
5. Screenshots + Cost report + Video  
6. Submit report + repo link  

---

**Coding “complete”** = repo files + tunhanu khud portal/setup steps (Part B).  
Questions resolve: rename pipeline/service connection strings YAML ch match karde raho.
