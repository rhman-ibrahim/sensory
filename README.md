# Sensory Asset Distribution System

This repository manages the deployment and automated sync of static web assets—including CSS files, favicons, fonts, logos, and OpenGraph images—to Amazon Web Services (AWS) infrastructure using GitHub Actions and OpenID Connect (OIDC).

## Overview

The purpose of this setup is to serve static website assets globally via AWS CloudFront and Amazon S3 while keeping operational costs within the AWS Free Tier allowances. 

To ensure security and automate updates, deployments are handled by GitHub Actions without using long-lived IAM access keys. Authentication is managed dynamically through OpenID Connect (OIDC).

## Infrastructure & Architecture

* **Storage Origin (Amazon S3):** Stores the static directories (`CSS`, `Favicon`, `fonts`, `Logo`, `OG`). The bucket access is restricted using least-privilege policies.

* **Content Delivery Network (Amazon CloudFront):** Caches assets at global edge locations to minimize latency, reduce bandwidth costs, and serve assets securely over HTTPS.

* **Continuous Integration / Continuous Deployment (GitHub Actions):** Automatically synchronizes repository directories to the S3 bucket and invalidates the CloudFront cache whenever code is pushed to the `main` branch.

## Security & Authentication Setup

Instead of hardcoding permanent credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`) in GitHub Secrets, the deployment authenticates using OpenID Connect (OIDC):

1. **Identity Provider:** An OIDC Identity Provider (`token.actions.githubusercontent.com`) is configured in AWS IAM.

2. **IAM Role:** An IAM Role (`GitHubActions-Sensory-Deploy`) is configured with a trust policy that permits only this repository (`repo:YOUR_GITHUB_USERNAME/sensory:*`) to request temporary access tokens.

3. **Least-Privilege Policy:** The IAM Role is attached to a custom policy restricted specifically to syncing objects in `arn:aws:s3:::rhman-sensory-site-001` and triggering invalidations on the designated CloudFront distribution.

### IAM Least-Privilege Policy Reference

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3BucketSyncPermissions",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::rhman-sensory-site-001",
                "arn:aws:s3:::rhman-sensory-site-001/*"
            ]
        },
        {
            "Sid": "CloudFrontInvalidationPermissions",
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation",
                "cloudfront:GetInvalidation"
            ],
            "Resource": "arn:aws:cloudfront::742931521701:distribution/*"
        }
    ]
}
```