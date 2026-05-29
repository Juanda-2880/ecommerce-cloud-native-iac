# Terraform vs. CloudFormation

In this project, we chose **Terraform** as our primary Infrastructure as Code (IaC) tool. Here is a comparison and the reasoning behind our choice.

## Why Terraform?

### 1. State Management
Terraform maintains a `terraform.tfstate` file that acts as a source of truth for the current infrastructure. This allows it to perform efficient diffs and only apply necessary changes.

### 2. Provider Ecosystem
While CloudFormation is AWS-native, Terraform is provider-agnostic. This means the same workflow can be used for AWS, Azure, GCP, or even SaaS products like GitHub and Cloudflare.

### 3. Modularity
Terraform's module system is highly intuitive, allowing us to break down a complex infrastructure into small, reusable, and testable components (e.g., a `networking` module vs. a `database` module).

### 4. HCL (HashiCorp Configuration Language)
HCL is more expressive and readable than the JSON or YAML used by CloudFormation, especially for complex logic and interpolations.

## Comparison Table

| Feature | Terraform | CloudFormation |
|---------|-----------|----------------|
| **Cloud Support** | Multi-cloud | AWS Only |
| **Language** | HCL | JSON/YAML |
| **State** | Managed locally or remotely | Managed by AWS (Stacks) |
| **Modules** | First-class citizen | Nested Stacks (more complex) |
| **Drift Detection**| Native (`plan` command) | Drift detection feature |

## Impact on this Project
By using Terraform, we were able to:
- Quickly iterate on networking changes.
- Reuse modules across different environments (e.g., sandbox vs. production).
- Maintain a clear and organized code structure that is easy for new developers to understand.
