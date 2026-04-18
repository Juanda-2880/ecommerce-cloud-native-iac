resource "aws_internet_gateway" "core_igw" {
  vpc_id = aws_vpc.core_vpc.id
  region = var.region
    tags = {
        Name = "core-igw"
    }
}

resource "aws_internet_gateway_attachment" "core_igw_attachment" {
  vpc_id = aws_vpc.core_vpc.id
  internet_gateway_id = aws_internet_gateway.core_igw.id
}