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