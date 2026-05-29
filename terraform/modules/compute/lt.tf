data "aws_ami" "ubuntu_stable"{
    most_recent = true
    owners      = ["099720109477"] # Canonical
    filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
    }
    filter {
        name = "virtualization-type"
        values = ["hvm"]
    }
}

resource "aws_launch_template" "ec2_lt" {
    name = "App-Server-lt"
    image_id = data.aws_ami.ubuntu_stable.id
    instance_type = var.instance_type
    
    iam_instance_profile {
        name = var.iam_instance_profile
    }

    network_interfaces {
        associate_public_ip_address = false
        security_groups = [aws_security_group.ec2_sg.id]
    }
    
    user_data = base64encode(templatefile("${path.module}/../../../scripts/install_app_ec2.sh", {
        db_host      = var.db_host
        db_port      = var.db_port
        db_user      = var.db_user
        db_pass      = var.db_pass
        db_name      = var.db_name
        mp_token     = var.mp_token
        frontend_url = var.frontend_url
    }))
    
    tag_specifications {
        resource_type = "instance"
        tags = {
            Name = "App-Server"
        }
    }
}
