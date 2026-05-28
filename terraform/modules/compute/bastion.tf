resource "aws_instance" "bastion" {
  ami                         = var.ami_id
  instance_type               = var.instance_type_bastion
  subnet_id                   = var.public_subnet_ids[0]
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.bastion_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "bastion-host"
  }
}
