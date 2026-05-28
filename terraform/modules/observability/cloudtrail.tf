resource "aws_cloudtrail" "main" {
  name                          = "${var.project_name}-trail-${var.environment}"
  s3_bucket_name                = var.logs_bucket_id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_logging                = true

  depends_on = [var.logs_bucket_policy_id] # Ensure policy is applied before trail starts writing
}
