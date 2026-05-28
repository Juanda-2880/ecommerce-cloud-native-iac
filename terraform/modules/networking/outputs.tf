output "vpc_id" {
  value = aws_vpc.core_vpc.id
}

output "private_subnet_ids" {
  value = [aws_subnet.private_subnet.id, aws_subnet.private_subnet2.id]
}

output "public_subnet_ids" {
  value = [aws_subnet.public_subnet1.id, aws_subnet.public_subnet2.id]
}