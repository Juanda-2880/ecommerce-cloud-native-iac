resource "aws_autoscaling_group" "app_asg" {
    max_size = var.max_size
    min_size = var.min_size
    desired_capacity = var.desired_capacity
    name = "app-asg"
    target_group_arns = [aws_lb_target_group.alb_ec2_tg.arn]
    vpc_zone_identifier = var.private_subnet_ids
    launch_template {
        id = aws_launch_template.ec2_lt.id
        version = "$Latest"
    }
    health_check_type = "ELB"
    health_check_grace_period = 300
}
