resource "aws_vpc" "core_vpc" {
    cidr_block = var.vpc_cidr
    region = var.region
    tags = {
        Name = "core-vpc"
    }
}