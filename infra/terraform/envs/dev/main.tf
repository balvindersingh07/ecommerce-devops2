terraform {
  required_version = ">= 1.6.0"
}

module "core" {
  source = "../../modules/core"

  resource_group_name          = var.resource_group_name
  location                     = var.location
  acr_name                     = var.acr_name
  aks_name                     = var.aks_name
  key_vault_name               = var.key_vault_name
  tenant_id                    = var.tenant_id
  log_analytics_workspace_name = var.log_analytics_workspace_name
  application_insights_name    = var.application_insights_name
  vnet_name                    = var.vnet_name
  aks_subnet_name              = var.aks_subnet_name
  node_count                   = var.node_count
  node_vm_size                 = var.node_vm_size
  tags                         = var.tags
  budget_amount_usd            = var.budget_amount_usd
  budget_contact_emails        = var.budget_contact_emails
}
