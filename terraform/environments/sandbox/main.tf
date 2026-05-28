module "networking" {
  source               = "../../modules/networking"
  region               = var.region
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidr1  = var.public_subnet_cidr1
  public_subnet_cidr2  = var.public_subnet_cidr2
  private_subnet_cidr1 = var.private_subnet_cidr1
  private_subnet_cidr2 = var.private_subnet_cidr2
  az1                  = var.az1
  az2                  = var.az2
}

module "database" {
  source                = "../../modules/database"
  dbport                = var.dbport
  app_security_group_id = "" # We will use a separate rule to avoid circular dependency
  vpc_id                = module.networking.vpc_id
  subnet_ids            = module.networking.private_subnet_ids
  db_engine             = var.db_engine
  db_engine_version     = var.db_engine_version
  deletion_protection   = var.deletion_protection
  db_name               = var.db_name
  db_username           = var.db_username
  db_password           = var.db_password
}

module "compute" {
  source             = "../../modules/compute"
  vpc_id             = module.networking.vpc_id
  public_subnet_ids  = module.networking.public_subnet_ids
  private_subnet_ids = module.networking.private_subnet_ids
  ami_id             = var.ami_id
  db_endpoint        = module.database.db_address # Using address instead of endpoint to avoid port duplication if needed
  db_username        = var.db_username
  db_password        = var.db_password
  db_name            = var.db_name
}

# Rule to allow App to access RDS - This breaks the circular dependency
resource "aws_security_group_rule" "app_to_rds" {
  type                     = "ingress"
  from_port                = var.dbport
  to_port                  = var.dbport
  protocol                 = "tcp"
  security_group_id        = module.database.db_security_group_id
  source_security_group_id = module.compute.app_security_group_id
}

# AUTOMATION OF THE DB CONECTION WITH THE BACKEND (Local file for convenience)
resource "local_file" "db_conf" {
  content  = <<-EOT
    DB_HOST=${module.database.db_address}
    DB_USER=${var.db_username}
    DB_PASS=${var.db_password}
    DB_NAME=${var.db_name}
    ALB_DNS=${module.compute.alb_dns_name}
    BASTION_IP=${module.compute.bastion_public_ip}
    EOT
  filename = "${path.module}/../../.env"
}
