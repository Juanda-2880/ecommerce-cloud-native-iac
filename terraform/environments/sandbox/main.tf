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
    app_security_group_id = module.compute.ec2_security_group_id
    vpc_id = module.networking.vpc_id
    subnet_ids = module.networking.private_subnet_ids
    db_engine = var.db_engine
    db_engine_version = var.db_engine_version
    deletion_protection = var.deletion_protection
    db_name = var.db_name
    db_username = var.db_username
    db_password = var.db_password
}

// PHASE 3

module "compute" {
    source = "../../modules/compute"
    vpc_id = module.networking.vpc_id
    public_subnet_ids = module.networking.public_subnet_ids
    private_subnet_ids = module.networking.private_subnet_ids
    app_port = var.app_port
    max_size = var.asg_max_size
    min_size = var.asg_min_size
    desired_capacity = var.asg_desired_capacity
    instance_type = var.instance_type
    
    # Pass variables for User Data interpolation
    db_host      = module.database.db_address
    db_port      = module.database.db_port
    db_user      = var.db_username
    db_pass      = var.db_password
    db_name      = var.db_name
    mp_token     = var.mp_access_token
    frontend_url = var.frontend_url
    jwt_secret   = var.jwt_secret

    # IAM Profile ARN (Updated for current Lab environment session)
    iam_instance_profile = "arn:aws:iam::426290579043:instance-profile/c203071a5182623l14631063t1w426290579043-SsmRoleInstanceProfile-BpWD7xquyv9j"
}

// PHASE 4 - STORAGE & OBSERVABILITY

module "storage" {
  source       = "../../modules/storage"
  project_name = var.project_name
  environment  = var.environment
  region       = var.region
}

module "observability" {
  source                = "../../modules/observability"
  project_name          = var.project_name
  environment           = var.environment
  alert_email           = var.alert_email
  asg_name              = module.compute.asg_name
  logs_bucket_id        = module.storage.logs_bucket_id
  logs_bucket_policy_id = "null" # Bypassing policy dependency check for Lab environment
  db_instance_id        = module.database.db_instance_id
  
  scale_up_policy_arn     = module.compute.scale_up_policy_arn
  scale_down_policy_arn   = module.compute.scale_down_policy_arn
  alb_arn_suffix          = module.compute.alb_arn_suffix
  target_group_arn_suffix = module.compute.target_group_arn_suffix
}

// AUTOMATION OF THE DB CONECTION WITH THE BACKEND

resource "local_file" "db_conf" {
    content = <<-EOT
    DB_HOST=${module.database.db_address}
    DB_PORT=${module.database.db_port}
    DB_USER=${var.db_username}
    DB_PASS=${var.db_password}
    MP_ACCESS_TOKEN=${var.mp_access_token}
    FRONTEND_URL=${var.frontend_url}
    S3_BUCKET_PRODUCTS=${module.storage.products_bucket_id}
    AWS_REGION=${var.region}
    EOT
    filename = "/home/juanda/Documents/Universidad/Infra III/Proyecto/ecommerce-cloud-native-iac/.env"
}
