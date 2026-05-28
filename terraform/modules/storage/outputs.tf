output "logs_bucket_id" {
  value = null_resource.s3_buckets.triggers.logs_bucket_name
}

output "logs_bucket_arn" {
  value = "arn:aws:s3:::${null_resource.s3_buckets.triggers.logs_bucket_name}"
}

output "logs_bucket_policy_id" {
  value = "null"
}

output "products_bucket_id" {
  value = null_resource.s3_buckets.triggers.products_bucket_name
}

output "products_bucket_arn" {
  value = "arn:aws:s3:::${null_resource.s3_buckets.triggers.products_bucket_name}"
}
