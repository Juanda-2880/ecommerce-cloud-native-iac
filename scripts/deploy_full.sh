#!/bin/bash
set -e

# --- CONFIGURATION ---
REGION="us-east-1"
PROJECT_NAME="shoply-neon"
ENV_DIR="terraform/environments/sandbox"

echo "🚀 Starting Full Automated Deployment for AWS Academy..."

# 1. Initialize Terraform to ensure we have the ECR repos defined
echo "📦 Initializing Terraform..."
cd $ENV_DIR
terraform init

# 2. Create ECR repositories first (if they don't exist) so we can push to them
# We do this by targeting the compute module or just running a partial apply
echo "🏗️ Deploying Infrastructure..."
terraform apply -auto-approve

# 4. Output the final URL
echo "🎉 Deployment Complete!"
ALB_URL=$(terraform output -raw -module=compute alb_dns_name 2>/dev/null || echo "ALB URL not available yet")
echo "🔗 Access your application at: http://$ALB_URL"
echo "⏳ Note: The application may take 3-5 minutes to build and start on the EC2 instances."
