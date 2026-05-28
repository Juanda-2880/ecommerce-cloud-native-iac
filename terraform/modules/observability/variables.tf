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
