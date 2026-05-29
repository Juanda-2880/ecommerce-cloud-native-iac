# Shoply Neon - Cloud Native E-commerce

[![Infrastructure: Terraform](https://img.shields.io/badge/Infrastructure-Terraform-623CE4.svg?style=flat&logo=terraform)](https://www.terraform.io/)
[![Backend: Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)

Shoply Neon is a scalable, highly available e-commerce platform built with a cloud-native architecture on AWS. It leverages Infrastructure as Code (IaC) to automate the deployment of a full-stack application.

## 🏗️ Project Structure

```text
/
├── backend/                          # Node.js Express API
│   ├── src/
│   │   ├── config/                   # Database & Cloud configurations
│   │   ├── controllers/              # Request handlers
│   │   ├── middleware/               # Auth & Upload filters
│   │   ├── models/                   # Sequelize (MySQL) schemas
│   │   └── routes/                   # API endpoint definitions
│   └── package.json
│
├── frontend/                         # React + Vite Application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Main view components
│   │   ├── services/                 # API communication logic
│   │   └── App.jsx                   # Root component
│   └── package.json
│
├── terraform/                        # Infrastructure as Code
│   ├── modules/                      # Reusable infrastructure blocks
│   │   ├── networking/               # VPC, Subnets, IGW, NAT
│   │   ├── compute/                  # EC2, ASG, ALB, Security Groups
│   │   ├── database/                 # RDS (MySQL)
│   │   ├── storage/                  # S3 Buckets
│   │   └── observability/            # CloudWatch Alarms & SNS
│   └── environments/
│       └── sandbox/                  # Environment-specific config
│
├── scripts/                          # Automation & Testing scripts
│   ├── install_app_ec2.sh            # User Data: Automated EC2 setup
│   └── stress_test.sh                # Load testing for Auto Scaling
│
└── docs/                             # Project Documentation
    ├── infrastructure.md             # Detailed architecture explanation
    ├── deployment_guide.md           # Step-by-step setup
    └── delirable.md                  # Project evaluation answers
```

## 🚀 Key Features

- **Automated Scaling:** Uses AWS Auto Scaling to handle traffic fluctuations.
- **High Availability:** Deployed across multiple Availability Zones.
- **Secure Networking:** Application and Database tiers are isolated in private subnets.
- **Centralized Monitoring:** CloudWatch alarms for health and performance tracking.
- **Automated Deployment:** From infrastructure to application setup using Terraform and Bash scripts.

## 🛠️ Tech Stack

- **Cloud:** AWS (EC2, ALB, ASG, RDS, S3, CloudWatch)
- **IaC:** Terraform
- **Backend:** Node.js, Express, Sequelize
- **Database:** MySQL (Amazon RDS)
- **Frontend:** React, Tailwind CSS
- **Proxy/Web Server:** Nginx, PM2

## Infrastructure diagram

<img src="image.png" alt="Diagrama de Terraform"/>


## 📖 Documentation

For more details, please refer to the files in the `docs/` directory:

- [Infrastructure Overview](docs/infrastructure.md)
- [Deployment Guide](docs/deployment_guide.md)
- [Deliverable Report](docs/delirable.md)

---
