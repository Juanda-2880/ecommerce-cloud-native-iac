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
