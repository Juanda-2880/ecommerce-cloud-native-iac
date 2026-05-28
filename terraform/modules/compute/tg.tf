resource "aws_lb_target_group" "alb_ec2_tg" {
    name_prefix = "app-" # Using prefix to avoid collisions during replacement
    port = 80 # ALB will now talk to Nginx on port 80
    protocol = "HTTP"
    vpc_id = var.vpc_id
    health_check {
        path = "/api/health" # Nginx will proxy this to the backend
        port = 80
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
    lifecycle {
        create_before_destroy = true
    }
}
