# ==============================================================================
# terraform/modules/database/outputs.tf
# Outputs del módulo de base de datos — consumidos por otros módulos
#
# SANDBOX: Se eliminaron outputs de Secrets Manager e IAM Role
#          porque esos recursos no se crean en el Sandbox de AWS.
# ==============================================================================

output "db_instance_id" {
  description = "Identificador único de la instancia RDS"
  value       = aws_db_instance.principal_rds.id
}

output "db_instance_arn" {
  description = "ARN de la instancia RDS"
  value       = aws_db_instance.principal_rds.arn
}

output "db_endpoint" {
  description = "Endpoint de conexión a la base de datos (host:port)"
  value       = aws_db_instance.principal_rds.endpoint
}

output "db_address" {
  description = "Hostname del endpoint de la base de datos (sin puerto)"
  value       = aws_db_instance.principal_rds.address
}

output "db_port" {
  description = "Puerto de la base de datos"
  value       = aws_db_instance.principal_rds.port
}

output "db_name" {
  description = "Nombre de la base de datos creada"
  value       = aws_db_instance.principal_rds.db_name
}

output "db_username" {
  description = "Nombre de usuario maestro de la base de datos"
  value       = aws_db_instance.principal_rds.username
  sensitive   = true
}

output "db_engine" {
  description = "Motor de base de datos en uso"
  value       = aws_db_instance.principal_rds.engine
}

output "db_engine_version" {
  description = "Versión del motor de base de datos"
  value       = aws_db_instance.principal_rds.engine_version_actual
}

output "db_instance_class" {
  description = "Clase de instancia de la base de datos"
  value       = aws_db_instance.principal_rds.instance_class
}

output "db_security_group_id" {
  description = "ID del Security Group de la instancia RDS (referenciado en Fase 3)"
  value       = aws_security_group.rds.id
}

output "db_subnet_group_name" {
  description = "Nombre del DB Subnet Group"
  value       = aws_db_subnet_group.db_subnet.name
}

output "db_parameter_group_name" {
  description = "Nombre del DB Parameter Group asociado"
  value       = aws_db_parameter_group.db_parameter.name
}

# Output formateado — copiar directamente al archivo .env de la aplicación
output "db_env_config" {
  description = "Bloque listo para pegar en app/.env (reemplazar PASSWORD manualmente)"
  sensitive   = true
  value       = <<-EOT
    DB_HOST=${aws_db_instance.principal_rds.address}
    DB_PORT=${aws_db_instance.principal_rds.port}
    DB_NAME=${aws_db_instance.principal_rds.db_name}
    DB_USER=${aws_db_instance.principal_rds.username}
    DB_PASSWORD=<tu_password_del_tfvars>
    DB_DIALECT=${aws_db_instance.principal_rds.engine}
  EOT
}
