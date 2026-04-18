resource "aws_vpc" "core_vpc" {
    cidr_block = var.vpc_cidr

    tags = {
        Name = "core-vpc"
    }
}