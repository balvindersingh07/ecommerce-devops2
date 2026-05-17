# Cost Estimate (Template)

Use the Azure Pricing Calculator to estimate monthly spend for:

- AKS cluster (node VM SKU and count)
- Azure Container Registry (Basic/Standard)
- Log Analytics ingestion
- Application Insights telemetry
- Key Vault operations
- Egress bandwidth and LoadBalancer

## Cost Governance Checklist

- Configure budget in Azure Cost Management
- Add budget threshold alerts (50%, 80%, 100%)
- Enforce tags: `env`, `owner`, `project`, `costCenter`
- Review right-sizing for AKS node pools monthly

## IaC Support in This Repo

Terraform now codifies:

- Resource tagging strategy
- Resource Group monthly budget (`azurerm_consumption_budget_resource_group`)
- Budget alert notifications via contact emails
