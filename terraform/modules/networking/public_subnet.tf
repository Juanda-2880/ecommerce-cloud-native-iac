resource "aws_subnet" "public_subnet1" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.public_subnet_cidr1
    availability_zone = var.public_subnet_az
    map_public_ip_on_launch = true
    tags = {
        Name = "public-subnet1"
    }
}

resource "aws_subnet" "public_subnet2" {
    vpc_id = aws_vpc.core_vpc.id
    cidr_block = var.public_subnet_cidr2
    availability_zone = var.public_subnet_az
    map_public_ip_on_launch = true
    tags = {
        Name = "public-subnet2"
    }
}