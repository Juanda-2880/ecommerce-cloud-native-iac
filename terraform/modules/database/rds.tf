resource "aws_db_instance" "principal_rds" {
    identifier = "principal-rds"
    engine = var.db_engine
    engine_version = var.db_engine_version
    instance_class = var.db_instance_class
    allocated_storage = 20
    max_allocated_storage = 100
    storage_type = "gp2"
    storage_encrypted = true
    db_subnet_group_name = aws_db_subnet_group.db_subnet.name
    vpc_security_group_ids = [aws_security_group.rds.id]
    publicly_accessible = false
    multi_az = false
    parameter_group_name = aws_db_parameter_group.db_parammeter.name
    backup_retention_period = 7
    backup_window = "03:00-04:00"
    maintenance_window = "Mon:04:00-Mon:05:00"
    auto_minor_version_upgrade = true
    monitoring_interval = var.monitoring_interval
    monitoring_role_arn = var.monitoring_interval > 0 ? aws_iam_role.rds_monitoring[0].arn : null
    performance_insights_enabled = false
    enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
    deletion_protection = var.deletion_protection
    skip_final_snapshot = true
    final_snapshot_identifier = var.final_snapshot_identifier
    apply_immediately = true

    tags = {
        Name = "Principal RDS Instance"
    }

    depends_on = [ 
        aws_db_subnet_group.db_subnet,
        aws_db_parameter_group.db_parammeter,
     ]

    

  
}