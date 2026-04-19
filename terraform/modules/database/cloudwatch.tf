resource "aws_cloudwatch_metric_alarm" "db_cpu_high" {
  alarm_name          = "db-cpu-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "CPU de RDS supera el 80% por 10 minutos"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.principal_rds.identifier
  }

  tags = {
    Name = "db-cpu-high"
  }
}

# Alarma: Poco espacio de almacenamiento libre
resource "aws_cloudwatch_metric_alarm" "db_storage_low" {
  alarm_name          = "db-storage-low"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = "1"
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "2000000000" # 2 GB en bytes
  alarm_description   = "Espacio libre de RDS por debajo de 2 GB"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.principal_rds.identifier
  }

  tags = {
    Name = "db-storage-low"
  }
}

# Alarma: Alta utilización de conexiones
resource "aws_cloudwatch_metric_alarm" "db_connections_high" {
  alarm_name          = "db-connections-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "DatabaseConnections"
  namespace           = "AWS/RDS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "Conexiones activas a RDS supera 80"
  treat_missing_data  = "notBreaching"

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.principal_rds.identifier
  }

  tags = {
    Name = "db-connections-high"
  }
}