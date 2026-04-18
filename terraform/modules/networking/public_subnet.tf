resource "aws_subnet" "public_subnet" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.public_subnet_cidr
    tags = {
        Name = "public-subnet"
    }
}