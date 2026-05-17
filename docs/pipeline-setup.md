# Azure DevOps Pipeline Setup

This guide configures CI and CD pipelines using the YAML files in this repository.

## Pipeline Files

- CI entry file: `azure-pipelines.yml`
- CD entry file: `azure-pipelines-cd.yml`
- CI template: `pipelines/ci.yml`
- CD template: `pipelines/cd.yml`

## Create Service Connections

Create these Azure DevOps service connections:

1. `acr-service-connection`
   - Type: Docker Registry
   - Registry type: Azure Container Registry
2. `aks-service-connection`
   - Type: Kubernetes
   - Connect to AKS cluster in target subscription

## Required Variables

Set these pipeline variables in Azure DevOps:

- `acrName`: ACR resource name, without `.azurecr.io`
- `aksResourceGroup`: resource group containing AKS
- `aksClusterName`: AKS cluster name
- `acrLoginServer`: `<acrName>.azurecr.io`
- `keyVaultName`: target Azure Key Vault name
- `tenantId`: Microsoft Entra tenant ID
- `ingressHost`: hostname for production Ingress (maps to `__INGRESS_HOST__`)
- `ingressHostStaging`: hostname for staging Ingress

Docker images build from **repository root** (`buildContext: .`) so `shared/catalog.json` is included in frontend and backend images.

## Environments and Approvals

Create environments:

- `ecommerce-staging`
- `ecommerce-production`

Enable manual approvals before `DeployProduction`.

## AKS Prerequisites

- Install/enable Secrets Store CSI Driver with Azure provider in AKS.
- Ensure AKS identity has access to Key Vault secrets.
- CD pipeline auto-renders Key Vault and tenant placeholders into manifests at deploy time.

## Bootstrap Order

1. Provision infra with Terraform (`infra/terraform/envs/dev`).
2. Create service connections.
3. Run CI pipeline.
4. Run CD pipeline.
5. Validate staging and approve production.

## Optional: Webhook Trigger (for Jenkins path)

If your institution requires Jenkins, configure GitHub webhooks for push/PR events and point to Jenkins webhook endpoint.
