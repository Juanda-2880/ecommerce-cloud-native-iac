variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "ami_id" {
  description = "AMI ID for EC2 instances"
  type        = string
  default     = "ami-0e2c8ccd4e022c147" # Amazon Linux 2023 or Ubuntu 24.04 in us-east-1
}

variable "instance_type_app" {
  description = "Instance type for application instances"
  type        = string
  default     = "t3.micro"
}

variable "instance_type_bastion" {
  description = "Instance type for bastion host"
  type        = string
  default     = "t2.micro"
}

variable "db_endpoint" {
  description = "RDS endpoint"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "key_name" {
  description = "Key pair name for SSH access"
  type        = string
  default     = "vockey" # Default key for AWS Academy
}
