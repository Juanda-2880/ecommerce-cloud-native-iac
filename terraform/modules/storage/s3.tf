resource "null_resource" "s3_buckets" {
  triggers = {
    logs_bucket_name     = "${var.project_name}-logs-${var.environment}"
    products_bucket_name = "${var.project_name}-products-${var.environment}"
  }

  # Create Logs Bucket
  provisioner "local-exec" {
    command = "aws s3api create-bucket --bucket ${self.triggers.logs_bucket_name} --region ${var.region} || true"
  }

  # Create Products Bucket
  provisioner "local-exec" {
    command = "aws s3api create-bucket --bucket ${self.triggers.products_bucket_name} --region ${var.region} || true"
  }

  # Configure Products Bucket Public Access
  provisioner "local-exec" {
    command = <<EOT
      aws s3api put-public-access-block \
        --bucket ${self.triggers.products_bucket_name} \
        --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" || true
    EOT
  }

  # Apply Public Read Policy to Products Bucket
  provisioner "local-exec" {
    command = <<EOT
      POLICY='{"Version":"2012-10-17","Statement":[{"Sid":"PublicReadGetObject","Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::${self.triggers.products_bucket_name}/*"}]}'
      aws s3api put-bucket-policy --bucket ${self.triggers.products_bucket_name} --policy "$POLICY"
    EOT
  }

  # Configure Logs Bucket for CloudTrail (Basic policy to allow CloudTrail)
  provisioner "local-exec" {
    command = <<EOT
      POLICY='{"Version":"2012-10-17","Statement":[{"Sid":"AWSCloudTrailAclCheck","Effect":"Allow","Principal":{"Service":"cloudtrail.amazonaws.com"},"Action":"s3:GetBucketAcl","Resource":"arn:aws:s3:::${self.triggers.logs_bucket_name}"},{"Sid":"AWSCloudTrailWrite","Effect":"Allow","Principal":{"Service":"cloudtrail.amazonaws.com"},"Action":"s3:PutObject","Resource":"arn:aws:s3:::${self.triggers.logs_bucket_name}/AWSLogs/*","Condition":{"StringEquals":{"s3:x-amz-acl":"bucket-owner-full-control"}}}]}'
      aws s3api put-bucket-policy --bucket ${self.triggers.logs_bucket_name} --policy "$POLICY"
    EOT
  }

  # Cleanup on destroy
  provisioner "local-exec" {
    when    = destroy
    command = "aws s3 rb s3://${self.triggers.logs_bucket_name} --force || true && aws s3 rb s3://${self.triggers.products_bucket_name} --force || true"
  }
}
