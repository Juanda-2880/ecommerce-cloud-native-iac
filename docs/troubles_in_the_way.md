# Challenges & Lessons Learned

Developing a cloud-native e-commerce platform presented several technical challenges. Here is how we overcame them.

## 1. Authentication & JWT Configuration
**Challenge:** Initially, authentication was failing between the frontend and backend due to incorrect JWT secret handling and CORS issues.
**Solution:** We implemented a unified `.env` injection system via Terraform to ensure the `JWT_SECRET` was consistent across all EC2 instances in the Auto Scaling Group. We also updated the Express middleware to properly handle credentials and CORS origins.

## 2. Dynamic Environment Variables
**Challenge:** The backend needs to know the RDS endpoint, S3 bucket names, and other dynamic AWS resources that are only known after the infrastructure is created.
**Solution:** We used Terraform's `templatefile` function to inject these dynamic values into the EC2 User Data script, which then generates the final `.env` file on the fly during instance boot-up.

## 3. Log Shipping to CloudWatch
**Challenge:** Tracking logs across multiple dynamic EC2 instances is difficult. Standard logs stay on the local disk and are lost when an instance scales in.
**Solution:** (Planned) Implementing the `amazon-cloudwatch-agent` to stream PM2 and Nginx logs to a centralized CloudWatch Log Group for persistent monitoring and alerting.

## 4. Database Connectivity
**Challenge:** Ensuring the application could connect to RDS while maintaining strict security.
**Solution:** We carefully configured Security Groups to allow inbound traffic on port 3306 ONLY from the security group associated with the EC2 instances.

## 5. Lab Environment Constraints
**Challenge:** Working within a restricted AWS Lab environment meant certain IAM actions and service quotas were limited.
**Solution:** We adapted the Terraform code to use pre-existing IAM profiles and focused on core services (EC2, RDS, S3) that are well-supported in lab settings.
