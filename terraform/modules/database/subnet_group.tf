resource "aws_db_subnet_group" "db_subnet" {
    name = "db-subnet-group"
    description = "Subnet group for RDS instance"
    subnet_ids = var.subnet_ids
    tags = {
      Name = "DB-Subnet-Group"
    }
}