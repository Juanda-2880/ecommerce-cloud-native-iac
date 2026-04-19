resource "aws_subnet" "private_subnet" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.private_subnet_cidr1
    availability_zone = var.private_subnet_az
    tags = {
        Name = "private-subnet"
    }
}

resource "aws_subnet" "private_subnet2" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.private_subnet_cidr2
    availability_zone = var.private_subnet_az
    tags = {
        Name = "private-subnet2"
    }
}