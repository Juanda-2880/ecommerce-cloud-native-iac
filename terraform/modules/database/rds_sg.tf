resource "aws_security_group" "rds" {
    name = "rds-sg"
    description = "Security Group for RDS instance"
    vpc_id = aws_vpc.core_vpc.id

    ingress {
        description = "Access from EC2 from App"
        from_port = var.dbport
        to_port = var.dbport
        protocol = "tcp"
        security_groups = var.app_security_group_id != "" ? [var.app_security_group_id] : null
        cidr_blocks     = var.app_security_group_id == "" ? ["10.0.0.0/8"] : null
    }
}