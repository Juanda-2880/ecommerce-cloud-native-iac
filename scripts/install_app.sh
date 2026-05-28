#!/bin/bash

# ==============================================================================
# EC2 Bootstrap Script - Shoply Neon Backend
# ==============================================================================

set -e # Exit on error

# Redirect all output to a log file for debugging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "Starting Bootstrap Process..."

# 1. Update and install basic dependencies
DEBIAN_FRONTEND=noninteractive apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get install -y curl git unzip build-essential

# 2. Install Node.js 20.x
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Install PM2 globally to manage the application process
echo "Installing PM2..."
npm install -g pm2

# 4. Prepare application directory
APP_DIR="/opt/ecommerce"
mkdir -p $APP_DIR
cd $APP_DIR

# 5. Clone the repository
# Note: In a real production scenario, you might use SSH keys or a Personal Access Token
echo "Cloning repository..."
git clone https://github.com/Juanda-2880/ecommerce-cloud-native-iac.git .

# 6. Navigate to backend and install dependencies
cd backend
echo "Installing backend dependencies..."
npm install --omit=dev

# 7. Setup Environment Variables
# These should be passed via Terraform or handled securely.
# For this bootstrap script, we assume they are provided or we use placeholders.
echo "Configuring environment variables..."
# If this script is used as User Data in Terraform, we replace placeholders
cat <<EOT > .env
DB_HOST=${DB_HOST}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
DB_NAME=${DB_NAME}
PORT=5000
JWT_SECRET=super-secret-key-change-me
EOT

# 8. Start the application with PM2
echo "Starting application with PM2..."
pm2 start src/index.js --name "shoply-backend"

# 9. Save PM2 process list and configure to start on boot
echo "Configuring PM2 to start on boot..."
pm2 save
pm2 startup systemd -u root --hp /root

echo "Bootstrap Process Completed Successfully!"
