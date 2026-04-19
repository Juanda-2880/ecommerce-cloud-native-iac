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

