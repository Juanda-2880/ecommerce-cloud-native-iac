variable "region" {
    description = "AWS Region"
    type = string
}
variable "vpc_cidr" {
    description = "Core VPC CIDR IP"
    type = string
}

variable "public_subnet_cidr1" {
    description = "Public Subnet CIDR IP"
    type = string
}

variable "public_subnet_cidr2" {
    description = "Public Subnet CIDR IP"
    type = string
}

variable "az1" {
    description = "Availability Zone us-east-1a"
    type = string
}

variable "private_subnet_cidr1" {
    description = "Private Subnet CIDR IP"
    type = string
}

variable "private_subnet_cidr2" {
    description = "Private Subnet CIDR IP"
    type = string
}


variable "az2" {
    description = "Availability Zone us-east-1b"
    type = string
}

// PHASE 2

variable "dbport" {
    description = "Port for RDS instance"
    type = number
}

variable "app_security_group_id" {
    description = "Permit Access to RDS"
    type = string
    default = ""
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
