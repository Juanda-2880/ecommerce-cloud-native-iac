region = "us-east-1"
vpc_cidr = "10.0.0.0/16"
public_subnet_cidr1 = "10.0.1.0/24"
public_subnet_cidr2 = "10.0.2.0/24"
private_subnet_cidr1 = "10.0.3.0/24"
private_subnet_cidr2 = "10.0.4.0/24"
az1 = "us-east-1a"
az2 = "us-east-1b"


// PHASE 2

dbport = 3306
ssh_key_name = "vockey" 
ami_id = "ami-0c101f26f147fa7fd" 
instance_profile_arn = "arn:aws:iam::248705478900:instance-profile/EC2-READ-IAM-ROLE" 
db_engine = "mysql"
db_engine_version = "8.0"
db_instance_class = "db.t3.micro"
db_name = "ecommerce_db"
db_username = "ecommerce_admin"
db_password = "SecurePassword123!"
