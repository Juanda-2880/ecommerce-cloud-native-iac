resource "aws_subnet" "private_subnet" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.private_subnet_cidr
    availability_zone = var.private_subnet_az
    tags = {
        Name = "private-subnet"
    }
}