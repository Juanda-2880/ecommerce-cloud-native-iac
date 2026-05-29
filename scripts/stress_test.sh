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

# Stress duration (default 10 minutes)
DURATION=${1:-600}

echo "Generating high CPU load for $DURATION seconds..."
echo "Monitoring should trigger 'high-cpu' alarm in CloudWatch."

# Run stress: --cpu spawns workers spinning on sqrt()
# We use slightly more workers than cores to ensure 100% utilization
sudo stress --cpu $((CPU_CORES + 1)) --timeout ${DURATION}s

echo "=== Stress Test Complete ==="
echo "Wait a few minutes for the ASG to scale down if no further load is detected."
