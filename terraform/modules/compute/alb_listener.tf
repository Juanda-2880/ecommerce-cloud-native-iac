resource "aws_lb_listener" "lb_listener" {
    load_balancer_arn = aws_alb.app_lb.arn
    port = 80
    protocol = "HTTP"
    default_action {
        type = "forward"
        target_group_arn = aws_lb_target_group.alb_ec2_tg.arn
    }
    tags = {
        Name = "lb-listener"
        }
}