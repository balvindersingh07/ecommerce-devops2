variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "acr_name" {
  type = string
}

variable "aks_name" {
  type = string
}

variable "key_vault_name" {
  type = string
}

variable "tenant_id" {
  type = string
}

variable "log_analytics_workspace_name" {
  type = string
}

variable "application_insights_name" {
  type = string
}

variable "vnet_name" {
  type = string
}

variable "vnet_address_space" {
  type    = list(string)
  default = ["10.10.0.0/16"]
}

variable "aks_subnet_name" {
  type = string
}

variable "aks_subnet_address_prefixes" {
  type    = list(string)
  default = ["10.10.1.0/24"]
}

variable "node_count" {
  type    = number
  default = 1
}

variable "node_vm_size" {
  type        = string
  description = "AKS node size (quota varies by region/subscription; avoid standardBsv2Family if quota is 0)."
  default     = "Standard_D2s_v3"
}

variable "tags" {
  type = map(string)
  default = {
    project = "ecommerce-devops-capstone"
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

# Optional RFC3339 budget start; leave empty to use first day of current UTC month.
variable "budget_start_date" {
  type    = string
  default = ""
}
