# Internet ---> ALB

resource "aws_security_group" "alb_sg" {
    name = "alb-sg"
    description = "Security group for ALB"
    vpc_id = var.vpc_id
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "alb-sg"
    }
}

# ALB --> EC2
 resource "aws_security_group" "ec2_sg" {
    name = "ec2-sg"
    description = "Security group for EC2 instances"
    vpc_id = var.vpc_id
    # Allow Frontend (served via Nginx on port 80)
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        security_groups = [aws_security_group.alb_sg.id]
    }
    # Optional: Allow Backend directly (for debugging if needed, though we use Nginx proxy)
    ingress {
        from_port = var.app_port
        to_port = var.app_port
        protocol = "tcp"
        security_groups = [aws_security_group.alb_sg.id]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "ec2-sg"
    }
}
