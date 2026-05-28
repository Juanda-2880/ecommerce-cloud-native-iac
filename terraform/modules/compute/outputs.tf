output "alb_dns_name" {
    value = aws_alb.app_lb.dns_name
    description = "DNS name of the Application Load Balancer"
}

output "ec2_security_group_id" {
    value = aws_security_group.ec2_sg.id
    description = "Security group ID of the EC2 instances"
}
