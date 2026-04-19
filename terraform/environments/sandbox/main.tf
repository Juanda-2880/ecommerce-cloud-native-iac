module "networking" {
    source = "../../modules/networking"
    region = var.region
    vpc_cidr = var.vpc_cidr
    public_subnet_cidr1 = var.public_subnet_cidr1
    public_subnet_cidr2 = var.public_subnet_cidr2
    private_subnet_cidr1 = var.private_subnet_cidr1
    private_subnet_cidr2 = var.private_subnet_cidr2
    az1 = var.az1
    az2 = var.az2
}

// PHASE 2

module "database" {
    source = "../../modules/database"
    dbport = var.dbport
    app_security_group_id = var.app_security_group_id
    vpc_id = module.networking.vpc_id
    subnet_ids = module.networking.private_subnet_ids
    db_engine = var.db_engine
    db_engine_version = var.db_engine_version
    deletion_protection = var.deletion_protection
    db_name = var.db_name
    db_username = var.db_username
    db_password = var.db_password
}