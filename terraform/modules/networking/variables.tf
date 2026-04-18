variable "region" {
    description = "AWS Region"
    type = string
}
variable "vpc_cidr" {
    description = "Core VPC CIDR IP"
    type = string
}

variable "public_subnet_cidr" {
    description = "Public Subnet CIDR IP"
    type = string
}

variable "public_subnet_az" {
    description = "Public Subnet Availability Zone"
    type = string
}

variable "private_subnet_cidr" {
    description = "Private Subnet CIDR IP"
    type = string
}

variable "private_subnet_az" {
    description = "Private Subnet Availability Zone"
    type = string
}

