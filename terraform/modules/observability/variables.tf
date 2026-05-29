variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "alert_email" {
  type = string
}

variable "asg_name" {
  type = string
}

variable "logs_bucket_id" {
  type = string
}

variable "logs_bucket_policy_id" {
  type = string
  default = ""
}

variable "alb_arn_suffix" {
  type        = string
  description = "ARN suffix of the Load Balancer"
  default     = ""
}

variable "target_group_arn_suffix" {
  type        = string
  description = "ARN suffix of the Target Group"
  default     = ""
}

variable "db_instance_id" {
  type        = string
  description = "Identifier of the RDS instance"
}
