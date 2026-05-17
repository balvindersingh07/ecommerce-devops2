# Final Presentation Outline (10-15 Minutes)

## 1. Problem and Objective (1 min)

- Goal: Build complete DevOps lifecycle for an e-commerce platform on Azure.
- Scope: CI/CD, containerization, IaC, security, monitoring, and cost governance.

## 2. Architecture Walkthrough (2-3 min)

- Show `docs/architecture.drawio` exported diagram.
- Explain flow: Git push -> CI -> ACR -> CD -> AKS (staging -> approval -> production).

## 3. Source Control and Workflow (1 min)

- Explain branching model (`main`, `develop`, `feature/*`).
- Show PR template and branch protection checklist.

## 4. CI/CD Demo (3-4 min)

- Trigger CI and show lint/test/build, artifact publish, image push, Trivy scan.
- Trigger CD and show staging deployment and manual production approval.

## 5. IaC Demo (2 min)

- Show Terraform folders and `plan/apply`.
- Highlight AKS, ACR, VNet, NSG, Key Vault, Monitor resources.

## 6. Security + Monitoring + Cost (2-3 min)

- Secrets via Key Vault + CSI.
- Pod security labels and network policy.
- Azure Monitor/App Insights dashboard and alert examples.
- Cost Management budget thresholds and governance tags.

## 7. Results and Next Improvements (1 min)

- Outcomes, lessons learned, and next steps (autoscaling, blue/green, policy as code).
