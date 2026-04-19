resource "aws_eip" "nat_eip" {
  domain = "vpc"
  tags = { Name = "core-nat-eip" }
}

resource "aws_nat_gateway" "core_nat_gateway" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id = aws_subnet.public_subnet.id
  region = var.region
    tags = {
        Name = "core-nat-gateway"
    }
}