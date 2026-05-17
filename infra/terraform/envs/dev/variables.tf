variable "resource_group_name" {
  type    = string
  default = "rg-ecommerce-devops-dev"
}

variable "location" {
  type    = string
  default = "Central India"
}

variable "acr_name" {
  type = string
}

variable "aks_name" {
  type    = string
  default = "aks-ecommerce-dev"
}

variable "key_vault_name" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "log_analytics_workspace_name" {
  type    = string
  default = "law-ecommerce-dev"
}

variable "application_insights_name" {
  type    = string
  default = "appi-ecommerce-dev"
}

variable "vnet_name" {
  type    = string
  default = "vnet-ecommerce-dev"
}

variable "aks_subnet_name" {
  type    = string
  default = "snet-aks-dev"
}

variable "node_count" {
  type    = number
  default = 1
}

variable "node_vm_size" {
  type    = string
  default = "Standard_B2s"
}

variable "tags" {
  type = map(string)
  default = {
    env        = "dev"
    owner      = "platform-team"
    project    = "ecommerce-devops-capstone"
    costCenter = "engineering"
  }
}

variable "budget_amount_usd" {
  type    = number
  default = 100
}

variable "budget_contact_emails" {
  type    = list(string)
  default = []
}
