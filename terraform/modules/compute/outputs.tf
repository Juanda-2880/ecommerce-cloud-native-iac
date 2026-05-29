output "alb_dns_name" {
    value = aws_alb.app_lb.dns_name
    description = "DNS name of the Application Load Balancer"
}

output "ec2_security_group_id" {
    value = aws_security_group.ec2_sg.id
    description = "Security group ID of the EC2 instances"
}

output "scale_up_policy_arn" {
  value = aws_autoscaling_policy.scale_up.arn
}

output "scale_down_policy_arn" {
  value = aws_autoscaling_policy.scale_down.arn
}

output "alb_arn_suffix" {
  value = aws_alb.app_lb.arn_suffix
}

output "target_group_arn_suffix" {
  value = aws_lb_target_group.alb_ec2_tg.arn_suffix
}
