output "logs_bucket_id" {
  value = aws_s3_bucket.logs.id
}

output "logs_bucket_arn" {
  value = aws_s3_bucket.logs.arn
}

output "logs_bucket_policy_id" {
  value = aws_s3_bucket_policy.logs_policy.id
}

output "products_bucket_id" {
  value = aws_s3_bucket.products.id
}

output "products_bucket_arn" {
  value = aws_s3_bucket.products.arn
}
