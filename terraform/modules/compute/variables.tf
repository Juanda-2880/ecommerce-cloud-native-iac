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

variable "ssh_key_name" {
  description = "SSH key name"
  type        = string
}

variable "instance_type" {
  description = "Instance type for App and Bastion"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "AMI ID (Amazon Linux 2023 or similar)"
  type        = string
}

variable "db_endpoint" {
  description = "RDS Endpoint"
  type        = string
}

variable "db_username" {
  description = "RDS Username"
  type        = string
}

variable "db_password" {
  description = "RDS Password"
  type        = string
}

variable "db_name" {
  description = "RDS Database Name"
  type        = string
}

variable "instance_profile_arn" {
  description = "Existing Instance Profile ARN"
  type        = string
}

variable "project_name" {
  description = "Project name for tagging"
  type        = string
  default     = "shoply-neon"
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "repo_url" {
  description = "GitHub Repository URL"
  type        = string
  default     = "https://github.com/Juanda-2880/ecommerce-cloud-native-iac.git"
}
