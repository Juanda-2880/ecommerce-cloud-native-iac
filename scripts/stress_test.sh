#!/bin/bash
# stress_test.sh
# This script installs and runs the 'stress' tool to simulate high CPU load
# for verifying Auto Scaling Group (ASG) scaling actions.

echo "=== Auto Scaling Stress Test Started ==="

# Check if stress is installed
if ! command -v stress &> /dev/null
then
    echo "Installing stress tool..."
    sudo apt-get update -y
    sudo apt-get install -y stress
fi

# Get number of CPU cores
CPU_CORES=$(nproc)
echo "Detected $CPU_CORES CPU cores."

# Stress duration (default 15 minutes to ensure alarm evaluates multiple times)
DURATION=${1:-900}

echo "Generating AGGRESSIVE load for $DURATION seconds..."
echo "Simulating: CPU, Memory, and I/O stress."
echo "Monitoring should trigger 'high-cpu' alarm in CloudWatch."

# Run stress with extreme parameters:
# --cpu: Spawn workers spinning on sqrt()
# --io: Spawn workers spinning on sync()
# --vm: Spawn workers spinning on malloc()/free()
# --vm-bytes: Each VM worker uses 256M
sudo stress --cpu $((CPU_CORES * 2)) --io 4 --vm 2 --vm-bytes 256M --timeout ${DURATION}s

echo "=== Stress Test Complete ==="
echo "Wait a few minutes for the ASG to scale down if no further load is detected."
