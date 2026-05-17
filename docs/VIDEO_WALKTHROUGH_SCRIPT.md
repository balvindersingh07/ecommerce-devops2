# 15-20 Minute Video Walkthrough Script

Use this as your speaking script so the video stays above 15 minutes and covers all required points.

## 0:00 - 1:30 | Introduction

- Introduce project title and objective:
  - end-to-end CI/CD for e-commerce platform on Azure.
- Mention stack:
  - React frontend, Node.js backend, Azure DevOps, ACR, AKS, Terraform, Key Vault, Monitor.

## 1:30 - 4:00 | Architecture Overview

- Open exported architecture diagram from `docs/architecture.drawio`.
- Explain flow:
  1. Code push and PR
  2. CI build/test/security
  3. Images to ACR
  4. CD to staging
  5. Manual approval
  6. Production deployment
- Highlight Azure services and why each is used.

## 4:00 - 6:00 | Source Control and Git Workflow

- Show repository structure.
- Explain branches:
  - `feature/*`, `develop`, `main`
- Show PR template and branch protection checklist.

## 6:00 - 9:00 | CI Pipeline Demo

- Open `pipelines/ci.yml`.
- Explain stages:
  - frontend lint/test/build
  - backend lint/test
  - publish test reports/artifacts
  - docker build/push
  - trivy scan
- Show one CI run in Azure DevOps (preferred live or screenshot).

## 9:00 - 12:00 | CD Pipeline + AKS Deployment Demo

- Open `pipelines/cd.yml`.
- Explain:
  - staging deployment
  - approval gate
  - production deployment
- Show AKS resources:
  - namespaces, pods, services
- Commands you can run during video:
  - `kubectl get ns`
  - `kubectl get pods -n staging`
  - `kubectl get pods -n production`

## 12:00 - 14:30 | Infrastructure as Code (Terraform)

- Open `infra/terraform/modules/core/main.tf`.
- Explain resources:
  - AKS, ACR, VNet, NSG, Key Vault, Log Analytics, App Insights
  - budget/alerts and tags
- Show `terraform plan` output screenshot or terminal run.

## 14:30 - 16:30 | Security Strategy

- Show `docs/security.md`.
- Explain:
  - Key Vault + CSI
  - network policies
  - pod security labels
  - non-root/privilege restrictions
  - image scanning in CI

## 16:30 - 18:00 | Monitoring and Alerts

- Show Azure Monitor/App Insights dashboard.
- Explain key metrics:
  - request rate, failures, latency, pod health
- Show one alert rule configuration screenshot.

## 18:00 - 19:30 | Cost Strategy

- Show Azure Pricing Calculator report (PDF/screenshot).
- Show Cost Management budget thresholds (50/80/100).
- Explain cost controls:
  - small node SKU, tagging, budget alerts, regular review.

## 19:30 - 20:00 | Key Learnings and Conclusion

- Share what you learned:
  - automation, infra consistency, secure secret flow, release governance.
- Summarize business value:
  - faster releases, safer deployments, better observability and cost control.

---

## Video Submission Checklist

- [ ] Duration >= 15 minutes
- [ ] Architecture explained clearly
- [ ] CI/CD shown (demo or run screenshots)
- [ ] AKS deployment evidence shown
- [ ] Terraform/IaC evidence shown
- [ ] Security strategy shown
- [ ] Monitoring + alerts shown
- [ ] Pricing/cost strategy shown
- [ ] Final project summary and learnings included
