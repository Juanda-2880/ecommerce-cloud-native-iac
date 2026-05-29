variable "vpc_id" {
  description = "The VPC ID where resources will be created"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs for the ALB"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the EC2 instances"
  type        = list(string)
}

variable "app_port" {
  description = "The port the application is running on"
  type        = number
  default     = 5000
}

variable "max_size" {
  description = "Maximum size of the Auto Scaling Group"
  type        = number
  default     = 5
}

variable "min_size" {
  description = "Minimum size of the Auto Scaling Group"
  type        = number
  default     = 2
}

variable "desired_capacity" {
  description = "Desired capacity of the Auto Scaling Group"
  type        = number
  default     = 2
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

# DB variables for User Data injection
variable "db_host" { type = string }
variable "db_port" { type = string }
variable "db_user" { type = string }
variable "db_pass" { type = string }
variable "db_name" { type = string }
variable "mp_token" { type = string }
variable "frontend_url" {
    type = string
}

variable "jwt_secret" {
    type = string
}

variable "iam_instance_profile" {
    type = string
}

