# ==============================================================================
# terraform/environments/sandbox/outputs.tf
# Outputs del entorno Sandbox — expone información del despliegue
# ==============================================================================

output "db_instance_id" {
  description = "Identificador único de la instancia RDS"
  value       = module.database.db_instance_id
}

output "db_instance_arn" {
  description = "ARN de la instancia RDS"
  value       = module.database.db_instance_arn
}

output "db_endpoint" {
  description = "Endpoint de conexión a la base de datos (host:port)"
  value       = module.database.db_endpoint
}

output "db_address" {
  description = "Hostname del endpoint de la base de datos (sin puerto)"
  value       = module.database.db_address
}

output "db_port" {
  description = "Puerto de la base de datos"
  value       = module.database.db_port
}

output "db_name" {
  description = "Nombre de la base de datos creada"
  value       = module.database.db_name
}

output "db_username" {
  description = "Nombre de usuario maestro de la base de datos"
  value       = module.database.db_username
  sensitive   = true
}

output "db_engine" {
  description = "Motor de base de datos en uso"
  value       = module.database.db_engine
}

output "db_engine_version" {
  description = "Versión del motor de base de datos"
  value       = module.database.db_engine_version
}

output "db_instance_class" {
  description = "Clase de instancia de la base de datos"
  value       = module.database.db_instance_class
}

output "db_security_group_id" {
  description = "ID del Security Group de la instancia RDS"
  value       = module.database.db_security_group_id
}

output "db_subnet_group_name" {
  description = "Nombre del DB Subnet Group"
  value       = module.database.db_subnet_group_name
}

output "db_parameter_group_name" {
  description = "Nombre del DB Parameter Group asociado"
  value       = module.database.db_parameter_group_name
}

output "db_env_config" {
  description = "Configuración para el archivo .env de la aplicación"
  sensitive   = true
  value       = module.database.db_env_config
}
