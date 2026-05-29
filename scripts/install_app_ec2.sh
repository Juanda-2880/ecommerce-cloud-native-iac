#!/bin/bash
set -e

# Logging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "=== Starting Consolidated Installation ==="

# Update and install dependencies
apt-get update -y
apt-get install -y git curl mysql-client nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Clone the repository
cd /home/ubuntu
git clone https://github.com/Juanda-2880/ecommerce-cloud-native-iac.git
cd ecommerce-cloud-native-iac

# Setup Backend
echo "=== Setting up Backend ==="
cd backend
npm install --omit=dev

# Inject Environment Variables from Terraform
cat <<EOT > .env
DB_HOST=${db_host}
DB_PORT=${db_port}
DB_USER=${db_user}
DB_PASS=${db_pass}
DB_NAME=${db_name}
MP_ACCESS_TOKEN=${mp_token}
FRONTEND_URL=${frontend_url}
JWT_SECRET=${jwt_secret}
EOT

# Start Backend using PM2 for persistence
npm install -g pm2
pm2 start src/index.js --name "backend"

# Setup Frontend
echo "=== Setting up Frontend ==="
cd ../frontend
npm install
npm run build

# Configure Nginx to serve Frontend and Proxy Backend
cat <<EOT > /etc/nginx/sites-available/default
server {
    listen 80;

    location / {
        root /home/ubuntu/ecommerce-cloud-native-iac/frontend/dist;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    location /uploads/ {
        proxy_pass http://localhost:5000/uploads/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
EOT

# Increase Nginx client_max_body_size for image uploads
sed -i 's/client_max_body_size .*/client_max_body_size 10M;/' /etc/nginx/nginx.conf || echo "client_max_body_size 10M;" >> /etc/nginx/nginx.conf

systemctl restart nginx

echo "=== Installation complete ==="
