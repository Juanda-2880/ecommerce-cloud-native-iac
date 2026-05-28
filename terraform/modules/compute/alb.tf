resource "aws_alb" "app_lb" {
    name = "app-lb"
    load_balancer_type = "application"
    internal = false
    security_groups = [aws_security_group.alb_sg.id]
    subnets = var.public_subnet_ids
    tags = {
        Name = "app-lb" 
        }
}
