# Cloud Architecture Diagram

This diagram represents the high-level architecture of the Shoply Neon e-commerce platform on AWS.

```mermaid
graph TD
    subgraph "AWS Cloud"
        subgraph "VPC (10.0.0.0/16)"
            IGW["Internet Gateway"]

            subgraph "Public Subnets (AZ1 & AZ2)"
                ALB["Application Load Balancer"]
                NAT["NAT Gateway"]
            end

            subgraph "Private Subnets (AZ1 & AZ2)"
                subgraph "Compute Tier"
                    ASG["Auto Scaling Group"]
                    EC2_1["EC2 Instance"]
                    EC2_2["EC2 Instance"]
                    ASG --- EC2_1
                    ASG --- EC2_2
                end

                subgraph "Database Tier"
                    RDS[("Amazon RDS (MySQL)")]
                end
            end
        end

        subgraph "Storage & Monitoring"
            S3_Logs["S3 Bucket (Logs)"]
            S3_Products["S3 Bucket (Products)"]
            CW["CloudWatch Monitoring"]
            SNS["SNS Topic (Alerts)"]
        end
    end

    %% Interactions
    User((Users)) --> IGW
    IGW --> ALB
    ALB --> ASG
    EC2_1 -.-> NAT
    EC2_2 -.-> NAT
    NAT --> IGW
    
    EC2_1 --> RDS
    EC2_2 --> RDS
    
    EC2_1 --> S3_Products
    EC2_1 --> S3_Logs
    
    CW -.-> ASG : "Scaling Policies"
    CW -.-> ALB : "Health Checks"
    CW -.-> RDS : "Metrics"
    CW --> SNS
    SNS --> Admin((Admin Email))
    
    %% Styling
    classDef aws fill:#f9f,stroke:#333,stroke-width:2px;
    classDef subnet fill:#e1f5fe,stroke:#01579b,stroke-dasharray: 5 5;
    classDef storage fill:#fff9c4,stroke:#fbc02d;
    
    class ALB,ASG,EC2_1,EC2_2,RDS aws;
    class S3_Logs,S3_Products,CW,SNS storage;
```

## Component Description

| Component | Description |
| :--- | :--- |
| **Internet Gateway** | Entry point for all public traffic to the VPC. |
| **Application Load Balancer** | Distributes incoming traffic across EC2 instances in the Auto Scaling Group. |
| **Auto Scaling Group** | Automatically manages the number of EC2 instances based on traffic demand. |
| **EC2 Instances** | Host the Node.js backend and React frontend (Nginx/PM2). |
| **NAT Gateway** | Allows instances in private subnets to securely access the internet (e.g., for updates). |
| **Amazon RDS (MySQL)** | Managed relational database for application data. |
| **Amazon S3** | Object storage for product images and application logs. |
| **CloudWatch** | Monitors system health and triggers scaling or alerts. |
| **SNS Topic** | Sends email notifications for system alerts. |
