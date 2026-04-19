resource "aws_vpc" "core_vpc" {
    cidr_block = var.vpc_cidr
    region = var.region
    enable_dns_support   = true
    enable_dns_hostnames = true
    tags = {
        Name = "core-vpc"
    }
}