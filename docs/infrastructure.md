# Infrastructure Design

This project implements a highly available and scalable cloud-native architecture on AWS.

## Architecture Overview

### 1. Networking (VPC)
- **VPC:** A custom Virtual Private Cloud with a 10.0.0.0/16 CIDR block.
- **Subnets:**
    - **Public Subnets:** Host the Application Load Balancer (ALB) and NAT Gateways.
    - **Private Subnets:** Host the Application Servers (EC2) and the Database (RDS).
- **Gateways:** Internet Gateway (IGW) for public access and NAT Gateways for private subnet outbound traffic.

### 2. Compute
- **Application Load Balancer (ALB):** Acts as the single entry point for traffic, terminating SSL (if configured) and routing requests to the ASG.
- **Auto Scaling Group (ASG):** Manages a fleet of Ubuntu EC2 instances. It automatically scales out during traffic spikes and scales in during low activity.
- **Launch Template:** Defines the instance configuration, including the AMI, instance type, and the automated installation script (User Data).

### 3. Database
- **Amazon RDS (MySQL):** A managed relational database service.
- **Security:** Placed in a private subnet and protected by a security group that only allows traffic from the application instances.

### 4. Storage
- **Amazon S3:** Used for:
    - Storing application logs.
    - Hosting product images and static assets.

### 5. Observability
- **CloudWatch Alarms:**
    - **High CPU:** Triggers scaling out (adding instances).
    - **Low CPU:** Triggers scaling in (removing instances).
    - **ALB 5XX Errors:** Alerts on application-level failures.
    - **RDS High CPU:** Monitors database health.
- **CloudWatch Logs:** Collects application logs for debugging and auditing.

## Infrastructure as Code (IaC)
The entire infrastructure is defined in **Terraform**. This allows for:
- Version control of infrastructure.
- Rapid and consistent deployments.
- Modular architecture for reusability.
