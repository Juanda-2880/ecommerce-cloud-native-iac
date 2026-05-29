resource "aws_internet_gateway" "core_igw" {
  vpc_id = aws_vpc.core_vpc.id
    tags = {
        Name = "core-igw"
    }
}