resource "aws_security_group" "rds" {
    name = "rds-sg"
    description = "Security Group for RDS instance"
    vpc_id = aws_vpc.core_vpc.id
}