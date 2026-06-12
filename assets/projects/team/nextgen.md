---
title: Nextgen
description: 차세대 크리에이터 육성 **아카데미 플랫폼**
period: 2026.03 ~ 2026.04
team: 주식회사 넥스트젠코퍼레이션
source_code: 소스 비공개 · 회사 정책에 따라 공개 제한
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

# Nextgen

## 개요

Nextgen은 차세대 크리에이터 육성 아카데미 플랫폼입니다. **웹, API, 모바일 앱을 하나의 monorepo에서 관리**하고, 결제, 영상, 이메일, SMS, 파일 업로드, 운영 배포까지 포함한 실서비스형 구조로 설계되었습니다.

특히 강의 사이트는 **한 달이라는 짧은 개발 기간과 DRM 적용 조건** 속에서 **실제 매출이 발생하는 운영 서비스**로 완성해야 했고, 제품이 사용자에게 처음 닿는 순간의 안정성과 완성도를 끝까지 책임지는 방향으로 개발했습니다.

README 기준 Next.js 웹, Fastify API, Expo 모바일 앱, PostgreSQL/Redis, S3/CloudFront, Mux, TossPayments, Resend, Naver SENS, Terraform, GitHub Actions, Vercel, AWS EC2/ECR 기반 배포 흐름을 포함합니다.

## 내 역할

- Next.js/Fastify/Expo 기반 monorepo 구조와 개발 환경을 정리했습니다.
- API, web, mobile, shared packages가 함께 움직이는 Turborepo 기반 개발 흐름을 구성했습니다.
- 강의 수강, 영상 보호, 결제, 사용자 인증, 운영 배포가 연결되는 **핵심 제품 흐름**을 설계하고 구현했습니다.
- AWS EC2/ECR, nginx Blue-Green 배포, Vercel prebuilt 배포, Terraform 인프라, **GitHub Actions CI/CD**를 연결했습니다.
- dev/prod 환경변수, SSM Parameter Store, Secrets Manager, RDS, S3/CloudFront 동기화 흐름을 정리했습니다.

## 문제와 해결

- 문제: 웹, 모바일, API, 인프라가 한 번에 엮이면 개발 환경과 운영 배포의 source of truth가 쉽게 흐려집니다.
- 해결: 환경별 `.env`, SSM Parameter Store, EAS profile, Vercel env, AWS Secrets Manager 역할을 분리하고 **README에 운영 절차를 문서화**했습니다.

- 문제: 오래된 CI run이 늦게 성공하거나 배포 중 마이그레이션이 실패하면 운영 환경이 깨질 수 있습니다.
- 해결: 브랜치별 deploy workflow, concurrency, 최신 변경 검증, migration job 차단, Blue-Green 전환 흐름을 둬 **배포 안정성**을 높였습니다.

- 문제: 짧은 개발 기간 안에 DRM 적용, 강의 수강 권한, 결제 후 접근, 피크 트래픽 대응을 함께 완성해야 했습니다.
- 해결: 수강 플로우와 영상 보호 정책, 결제 상태, 배포 안정성을 분리해 점검하고, 출시 전후 장애 가능성이 높은 구간을 우선적으로 안정화했습니다.

## 수치화된 성과

- **약 1개월 개발 기간** 안에 강의 사이트를 출시 가능한 수준으로 완성했습니다.
- **피크 타임 동시 접속자 1,000명 규모에서도 오류율 0%를 기록**했습니다.
- 서비스 **일일 매출 6,000만 원 달성**에 크게 기여했습니다.
- web, api, mobile 3개 앱과 types, utils, api-client, auth, config 등 5개 공유 package를 monorepo에 구성했습니다.
- GitHub Actions 기준 CI, dev 배포, prod 배포, iOS TestFlight, iOS App Store 후보 배포 workflow를 설계했습니다.
- AWS, Vercel, Cloudflare, EAS, SSM, Secrets Manager까지 6개 이상의 운영 계층을 하나의 배포 문서로 정리했습니다.
