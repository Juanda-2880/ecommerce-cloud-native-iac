resource "aws_db_parameter_group" "db_parammeter" {
    name = "db-params"
    family = var.db_engine == "mysql" ? "mysql8.0" : (var.db_engine == "postgres" ? "postgres15" : "mariadb10.6")
    description = "Custom parameter group for RDS instance"

    dynamic "parameter" {
        for_each = var.db_engine == "mysql" ? [
        { name = "character_set_server", value = "utf8mb4" },
        { name = "character_set_client", value = "utf8mb4" },
        { name = "collation_server", value = "utf8mb4_unicode_ci" },
        { name = "max_connections", value = "100" },
        { name = "slow_query_log", value = "1" },
        { name = "long_query_time", value = "2" },
    ] : []

    content {
    name  = parameter.value.name
    value = parameter.value.value
    }
    }
    tags = {
        Name = "db-params"
    }

    lifecycle {
      create_before_destroy = true
    }
}