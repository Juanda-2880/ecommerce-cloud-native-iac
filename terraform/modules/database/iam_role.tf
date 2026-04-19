resource "aws_iam_role" "rds_monitoring" {
    count = var.monitoring_interval > 0 ? 1 : 0
    name = "rds-monitoring-role"
    description = "IAM Role for RDS Enhanced Monitoring"
    assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
    {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
        Service = "monitoring.rds.amazonaws.com"
        }
    }
    ]
})

    tags = {
        Name = "rds-monitoring-role"
    }
}

resource "aws_iam_role_policy_attachment" "rds_monitoring" {
    count = var.monitoring_interval > 0 ? 1 : 0
    role       = aws_iam_role.rds_monitoring[0].name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}