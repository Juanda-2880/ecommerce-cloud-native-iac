resource "aws_route_table" "public_route_table" {
    vpc_id = aws_vpc.core_vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.core_igw.id
    }
    tags = {
        Name = "public-route-table"
    }
}

resource "aws_route_table_association" "public_subnet1_association" {
    subnet_id = aws_subnet.public_subnet1.id
    route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet2_association" {
    subnet_id = aws_subnet.public_subnet2.id
    route_table_id = aws_route_table.public_route_table.id
}

// PRIVATE ROUTE TABLE

resource "aws_route_table" "private_route_table" {
    vpc_id = aws_vpc.core_vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        nat_gateway_id = aws_nat_gateway.core_nat_gateway.id
    }

    tags = {
        Name = "private-route-table"
    }
}

resource "aws_route_table_association" "private_subnet_association1" {
    subnet_id = aws_subnet.private_subnet.id
    route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "private_subnet_association2" {
    subnet_id = aws_subnet.private_subnet2.id
    route_table_id = aws_route_table.private_route_table.id
}

