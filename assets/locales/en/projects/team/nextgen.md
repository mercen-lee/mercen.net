---
title: NextGen
description: An **academy platform** for developing the next generation of creators
logo_image: ../../images/projects/nextgen.webp
period: 2026.03 ~ 2026.04
team: NextGen Corporation
source_code: Private source · Disclosure is restricted by company policy
team_ref: ../../career.json#/2
career_ref: ../../career.json#/2
tech_stacks:
  - Next.js
  - React
  - TypeScript
  - Fastify
  - PostgreSQL
  - Redis
  - Expo
  - Turborepo
  - AWS
  - Terraform
  - Vercel
---

# NextGen

## Overview

NextGen is an academy platform for developing the next generation of creators. It manages **web, API, and mobile applications in one monorepo** and includes the production architecture required for payments, video, email, SMS, file uploads, and deployment.

The course platform had to launch as a **revenue-generating production service** within about one month while meeting DRM requirements. I was responsible for the implementation and operational readiness needed to launch it on schedule.

The documented architecture includes a Next.js web application, Fastify API, Expo mobile app, PostgreSQL and Redis, S3 and CloudFront, Mux, TossPayments, Resend, Naver SENS, Terraform, GitHub Actions, Vercel, and AWS EC2/ECR deployment.

## My Role

- Organized the Next.js, Fastify, and Expo monorepo architecture and development environment.
- Built a Turborepo workflow connecting the API, web, mobile, and shared packages.
- Designed and implemented the **core product flow** connecting course access, video protection, payment, user authentication, and production deployment.
- Connected AWS EC2/ECR, nginx Blue-Green deployment, Vercel prebuilt deployment, Terraform infrastructure, and **GitHub Actions CI/CD**.
- Documented development and production environment variables, SSM Parameter Store, Secrets Manager, RDS, and S3/CloudFront synchronization.

## Problems and Solutions

- Problem: When web, mobile, API, and infrastructure evolve together, the source of truth for development and deployment can easily become unclear.
- Solution: Separated the roles of environment-specific `.env` files, SSM Parameter Store, EAS profiles, Vercel environment variables, and AWS Secrets Manager, then **documented operational procedures in the README**.

- Problem: A stale CI run that succeeds late, or a failed migration during deployment, can damage the production environment.
- Solution: Added branch-specific deployment workflows, concurrency control, latest-change validation, migration-job blocking, and a Blue-Green cutover process to improve **deployment safety**.

- Problem: DRM, course authorization, post-payment access, and peak-traffic handling all had to be completed within a short development schedule.
- Solution: Validated enrollment flow, video protection, payment state, and deployment reliability as separate concerns, prioritizing the areas most likely to fail before and after launch.

## Quantified Results

- Completed the course platform to a launch-ready standard within **approximately one month of development**.
- Recorded a **0% error rate at peak concurrency of roughly 1,000 users**.
- Developed and operated a service with up to approximately **KRW 60 million in daily revenue**.
- Organized three applications—web, API, and mobile—along with five shared packages for types, utilities, API clients, authentication, and configuration.
- Designed GitHub Actions workflows for CI, development deployment, production deployment, iOS TestFlight, and iOS App Store candidate releases.
- Consolidated more than six operational layers—including AWS, Vercel, Cloudflare, EAS, SSM, and Secrets Manager—into one deployment guide.
