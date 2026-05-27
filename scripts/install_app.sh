#!/bin/bash

set -euo pipefail

APP_DIR="/opt/ecommerce"
NODE_VERSION="20"
REPO_URL="https://github.com/Juanda-2880/ecommerce-cloud-native-iac.git"  # Actualizar

echo "=== [1/5] Actualizando paquetes del sistema ==="
sudo apt-get update -y
sudo apt-get install -y curl git unzip

echo "=== [2/5] Instalando Node.js ${NODE_VERSION} ==="
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version

echo "=== [3/5] Clonando repositorio ==="
sudo mkdir -p $APP_DIR
sudo git clone $REPO_URL $APP_DIR
cd $APP_DIR/app

echo "=== [4/5] Instalando dependencias ==="
sudo npm ci --omit=dev

echo "=== [5/5] Listo — Ejecutar 'npm start' para iniciar ==="
echo "Recuerda configurar el archivo .env con los datos de RDS"