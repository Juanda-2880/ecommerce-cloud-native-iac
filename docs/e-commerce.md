# Shoply Neon - Cloud Native E-commerce

Shoply Neon is a modern, cloud-native e-commerce platform designed to demonstrate the power of automated infrastructure and scalable application design.

## The Business Problem
Traditional e-commerce platforms often struggle with:
- **Sudden Traffic Spikes:** Black Friday or flash sales can crash servers if they aren't scalable.
- **High Operational Costs:** Maintaining idle servers during low-traffic periods is expensive.
- **Security Risks:** Exposing databases directly to the internet is a major vulnerability.
- **Slow Deployment:** Manual configuration of servers is slow and prone to human error.

## The Solution: Cloud-Native Approach
Shoply Neon solves these problems by leveraging AWS cloud-native services:
- **Elasticity:** The system automatically scales based on demand, ensuring performance during peaks and cost-efficiency during lulls.
- **Resilience:** By distributing resources across multiple Availability Zones and using a Load Balancer, the app remains online even if a specific instance or zone fails.
- **Security by Design:** Using a private/public subnet architecture ensures that sensitive data in the database is never directly accessible from the internet.
- **DevOps Culture:** The entire environment is treated as code, enabling "push-button" deployments and consistent environments from development to production.

## Core Features
- **User Authentication:** Secure login and registration.
- **Product Management:** Dynamic product catalog with image uploads.
- **Shopping Cart:** Real-time cart management.
- **Payment Integration:** Secure checkout process.
- **Order History:** Tracking and viewing past purchases.
