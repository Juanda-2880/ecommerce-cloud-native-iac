resource "aws_lb_target_group" "alb_ec2_tg" {
    name = "App-Server-tg"
    port = var.app_port
    protocol = "HTTP"
    vpc_id = var.vpc_id
    health_check {
        path = "/api/health"
        port = var.app_port
        protocol = "HTTP"
        matcher = "200"
        interval = 30
        timeout = 5
        healthy_threshold = 2
        unhealthy_threshold = 2
    }
    tags = {
        Name = "App-Server-tg"
    }
}
