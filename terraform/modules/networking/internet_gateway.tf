resource "aws_internet_gateway" "name" {
  vpc_id = aws_vpc.core_vpc.id
  region = var.region
    tags = {
        Name = "core-igw"
    }
}