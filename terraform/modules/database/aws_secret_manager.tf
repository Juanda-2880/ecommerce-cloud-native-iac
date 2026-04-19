resource "aws_secretsmanager_secret" "db_credentials" {
    name = "db-credentials"
    description = "Credentials for the RDS instance"
    recovery_window_in_days = 0
    tags = {
        Name = "db-credentials"
    }
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
    secret_id = aws_secretsmanager_secret.db_credentials.id
    secret_string = jsonencode({
        engine = var.db_engine
        host = aws_db_instance.principal_rds.address
        port = var.dbport
        dbname = var.db_name
        username = var.db_username
        password = var.db_password
    })

    depends_on = [ aws_db_instance.principal_rds ]
}