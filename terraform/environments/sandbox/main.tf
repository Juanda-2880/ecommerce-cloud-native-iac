module "networking" {
    source = "../../modules/networking"
    region = var.region
    vpc_cidr = var.vpc_cidr
    public_subnet_cidr1 = var.public_subnet_cidr1
    public_subnet_cidr2 = var.public_subnet_cidr2
    private_subnet_cidr1 = var.private_subnet_cidr1
    private_subnet_cidr2 = var.private_subnet_cidr2
    public_subnet_az = var.public_subnet_az
    private_subnet_az = var.private_subnet_az
}