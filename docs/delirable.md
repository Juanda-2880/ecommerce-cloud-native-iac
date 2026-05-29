# Project Deliverable Report

## Evaluation Questions

### Does the solution meet the study case requirements?
Yes, the solution delivers a fully functional, cloud-native e-commerce platform. It includes a robust Node.js backend, a modern React frontend, and a production-grade AWS infrastructure managed via Infrastructure as Code (Terraform). The system handles the entire lifecycle of an e-commerce transaction, from product listing to payment processing.

### Is the topology efficient and scalable?
Absolutely. The architecture follows AWS best practices:
- **Scalability:** Uses an Auto Scaling Group (ASG) that adjusts the number of EC2 instances based on real-time CPU demand.
- **Efficiency:** An Application Load Balancer (ALB) ensures optimal traffic distribution across healthy instances.
- **Availability:** The multi-tier VPC design distributes resources across multiple Availability Zones to ensure high availability.

### Have security principles been correctly applied?
Yes, security is a core pillar of this implementation:
- **Network Isolation:** The database (RDS) and application servers (EC2) are placed in private subnets, making them inaccessible from the public internet.
- **Least Privilege:** Security Groups act as virtual firewalls, strictly controlling traffic. For example, the database only accepts connections from the application tier on port 3306.
- **IAM Roles:** Instances use IAM Roles with scoped permissions instead of static credentials to access AWS services like S3.

### Implementation of Infrastructure as Code (Terraform/CloudFormation)
While the initial requirement mentioned CloudFormation, this project utilizes **Terraform** for its superior modularity and state management.
- **Clarity:** The code is organized into reusable modules (Networking, Compute, Database, Observability), making it highly readable.
- **Reproducibility:** The entire stack can be destroyed and recreated with a single command, ensuring environment consistency.

### Automation
- **Configuration Management:** We use EC2 User Data scripts (`install_app_ec2.sh`) to fully automate the provisioning of the OS, installation of runtimes (Node.js), web servers (Nginx), and the application deployment using PM2.
- **Auto Scaling:** Scaling policies are tied to CloudWatch Alarms, allowing the system to grow or shrink automatically without manual intervention.

### Documentation
The documentation provided in the `docs/` folder covers infrastructure design, deployment guides, and troubleshooting, ensuring that the system is maintainable by other engineers.

### Presentation
Technical concepts such as "Load Balancing," "Auto Scaling," and "VPC Tiers" are documented and implemented to show a clear understanding of cloud-native principles.

### Database Analysis
For this project, we chose **Amazon RDS (Relational Database Service)** with MySQL.
- **Suitability:** Relational databases are ideal for e-commerce due to their ACID compliance, which is critical for transaction integrity and complex relationships between users, products, and orders.
- **Alternative - NoSQL (DynamoDB):** Would be suitable for high-speed product catalogs or session management where horizontal scaling is more critical than complex joins.
- **Alternative - In-Memory (Redis/ElastiCache):** Highly recommended for caching frequently accessed data (like top-selling products) or managing shopping carts to reduce database load and latency.
