variable "dbport" {
    description = "Port for RDS instance"
    type = number
}

variable "app_security_group_id" {
    description = "Permit Access to RDS"
    type = string
    default = ""
}

variable "vpc_id" {
    description = "VPC ID for RDS instance"
    type = string
}

variable "subnet_ids" {
    description = "Subnet IDs for RDS instance"
    type = list(string)
}

variable "db_engine" {
  description = "Motor de base de datos (mysql, postgres, mariadb)"
  type        = string
  default     = "mysql"

  validation {
    condition     = contains(["mysql", "postgres", "mariadb"], var.db_engine)
    error_message = "The motor must be 'mysql', 'postgres' or 'mariadb'."
  }
}