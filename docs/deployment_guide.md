# Deployment Guide

Follow these steps to deploy the Shoply Neon E-commerce platform.

## Prerequisites
- AWS CLI configured with appropriate credentials.
- Terraform installed (v1.0.0+).
- Node.js and npm (for local development/testing).

## Deployment Steps

### 1. Initialize Terraform
Navigate to the sandbox environment directory:
```bash
cd terraform/environments/sandbox
terraform init
```

### 2. Configure Variables
Create a `terraform.tfvars` file (or update the existing one) with your specific values:
- `db_username`
- `db_password`
- `mp_access_token` (Mercado Pago)
- `alert_email`
- `iam_instance_profile` (Use the one provided by your AWS lab)

### 3. Review the Plan
```bash
terraform plan
```

### 4. Apply the Infrastructure
```bash
terraform apply -auto-approve
```
*Note: This process takes about 5-10 minutes as it provisions the VPC, RDS instance, and EC2 Auto Scaling Group.*

### 5. Access the Application
Once the apply is complete, Terraform will output the ALB DNS name.
- Open your browser and navigate to the ALB DNS name to view the frontend.
- The API is available at `http://<ALB-DNS>/api/`.

## Post-Deployment Verification
1. **Health Check:** Visit `http://<ALB-DNS>/api/health` to confirm the backend is connected to the database.
2. **Auto Scaling:** You can run the `scripts/stress_test.sh` on one of the EC2 instances to verify that the ASG scales up when CPU usage increases.

## Cleanup
To avoid ongoing costs, destroy the infrastructure when finished:
```bash
terraform destroy -auto-approve
```
