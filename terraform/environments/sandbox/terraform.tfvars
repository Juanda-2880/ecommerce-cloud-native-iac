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
db_engine = "mysql"
db_engine_version = "8.0"
db_instance_class = "db.t3.micro"
db_name = "ecommerce_db"
db_username = "ecommerce_admin"
db_password = "SecurePassword123!"
mp_access_token = "APP_USR-2384610578886259-052813-0a4d24ef8e12daa0e42a11badbeb5d85-3433470360"
frontend_url = "http://localhost:8082"

// PHASE 3

app_port = 5000
asg_max_size = 5
asg_min_size = 2
asg_desired_capacity = 2
instance_type = "t3.micro"
# Removed ssh_key_name as requested
