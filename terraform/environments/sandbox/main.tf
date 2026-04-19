module "networking" {
    source = "../../modules/networking"
    region = var.region
    vpc_cidr = var.vpc_cidr
    public_subnet_cidr = var.public_subnet_cidr
    private_subnet_cidr = var.private_subnet_cidr
    public_subnet_az = var.public_subnet_az
    private_subnet_az = var.private_subnet_az
    public_subnet_cidr_2 = var.public_subnet_cidr_2
    private_subnet_cidr_2 = var.private_subnet_cidr_2
    public_subnet_az_2 = var.public_subnet_az_2
    private_subnet_az_2 = var.private_subnet_az_2
}