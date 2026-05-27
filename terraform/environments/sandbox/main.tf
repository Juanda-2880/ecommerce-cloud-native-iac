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

module "compute" {
    source = "../../modules/compute"
    vpc_id = module.networking.vpc_id
    public_subnet_ids = [module.networking.public_subnet1_id, module.networking.public_subnet2_id]
    private_subnet_ids = module.networking.private_subnet_ids
    ssh_key_name = var.ssh_key_name
    ami_id = var.ami_id
    aws_region = var.region
    instance_profile_arn = var.instance_profile_arn
    db_endpoint = module.database.db_endpoint
    db_username = var.db_username
    db_password = var.db_password
    db_name = var.db_name
}

module "database" {
    source = "../../modules/database"
    dbport = var.dbport
    app_security_group_id = module.compute.app_security_group_id
    vpc_id = module.networking.vpc_id
    subnet_ids = module.networking.private_subnet_ids
    db_engine = var.db_engine
    db_engine_version = var.db_engine_version
    deletion_protection = var.deletion_protection
    db_name = var.db_name
    db_username = var.db_username
    db_password = var.db_password
}

// AUTOMATION OF THE DB CONECTION WITH THE BACKEND

resource "local_file" "db_conf" {
    content = <<-EOT
    DB_HOST=${module.database.db_endpoint}
    DB_USER=${var.db_username}
    DB_PASS=${var.db_password}
    EOT
    filename = "/home/juanda/Documents/Universidad/Infra III/Proyecto/ecommerce-cloud-native-iac/.env"
}

