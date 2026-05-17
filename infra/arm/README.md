# ARM Templates (Alternative to Terraform)

This repository **primarily uses Terraform** under `infra/terraform/` for IaC.

If your college mandates **ARM** as an alternative demonstration:

1. Start from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/) for:
   - Container Registry
   - Kubernetes Service
   - Key Vault
   - Virtual Network / NSG
2. Chain deployments with nested templates or deployment scripts.
3. Store canonical parameters in `parameters.json` files (never commit secrets).

Example minimal template `resource-group-scope.json` creates **only** a Resource Group via subscription deployment — use as a pattern starter, then extend with nested templates for ACR/AKS/KV.
