variable "asg_name" {
  type        = string
  description = "Name of the Auto Scaling Group"
}

variable "alb_arn_suffix" {
  type        = string
  description = "ARN suffix of the Load Balancer"
}

variable "target_group_arn_suffix" {
  type        = string
  description = "ARN suffix of the Target Group"
}

variable "db_instance_id" {
  type        = string
  description = "Identifier of the RDS instance"
}

variable "notification_email" {
  type        = string
  description = "Email address for notifications"
  default     = "juandau.2880@gmail.com"
}
