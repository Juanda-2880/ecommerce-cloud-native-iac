resource "aws_instance" "bastion" {
  ami           = var.ami_id
  instance_type = "t3.micro"
  subnet_id     = var.public_subnet_ids[0]
  key_name      = var.ssh_key_name

  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  root_block_device {
    volume_type = "gp2"
    volume_size = 8
    encrypted   = false
  }

  tags = {
    Name = "${var.project_name}-bastion"
  }
}
