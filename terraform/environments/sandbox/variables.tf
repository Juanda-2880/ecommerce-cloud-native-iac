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

variable "monitoring_interval" {
  description = "Interval for Enhanced Monitoring in seconds. Default is 60 seconds."
  type        = number
  default     = 60
}

variable "db_engine_version" {
  description = "Engine version for RDS instance"
  type        = string
  default     = "8.0"
}

variable "db_instance_class" {
  description = "Clase de instancia RDS. NOTA SANDBOX: Solo db.t3.micro o db.t3.medium"
  type        = string
  default     = "db.t3.micro"

  validation {
    condition     = contains(["db.t3.micro", "db.t3.small", "db.t3.medium"], var.db_instance_class)
    error_message = "The sandbox only allows instances of type db.t3.micro, db.t3.small or db.t3.medium."
  }
}

variable "enabled_cloudwatch_logs_exports" {
  description = "List of log types to export to CloudWatch Logs. For MySQL, valid values are 'error', 'general', 'slowquery'. For PostgreSQL, valid values are 'postgresql', 'upgrade'. For MariaDB, valid values are 'error', 'slowquery'."
  type        = list(string)
  default     = ["error", "slowquery"] 
}

variable "deletion_protection" {
  description = "Enable protection against accidental deletion"
  type        = bool
  default     = false 
}

variable "db_name" {
  description = "Name of the initial database to create"
  type        = string
  default     = "ecommerce_db"
}

variable "db_username" {
  description = "Master user name for the database"
  type        = string
  default     = "admin"
  sensitive   = true
}

variable "db_password" {
  description = "Password for the master user. Minimum 8 characters"
  type        = string
  sensitive   = true

  validation {
    condition     = length(var.db_password) >= 8
    error_message = "The password must be at least 8 characters long."
  }
}

variable "skip_final_snapshot" {
  description = "Omit final snapshot when deleting the instance"
  type        = bool
  default     = true 
}

variable "final_snapshot_identifier" {
  description = "Name of the final snapshot (only applies if skip_final_snapshot = false)"
  type        = string
  default     = "my-db-snapshot"
}


