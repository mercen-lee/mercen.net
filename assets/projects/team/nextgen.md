---
title: NextGen
description: 차세대 크리에이터 육성 **아카데미 플랫폼**
logo_image: ../../images/projects/nextgen.webp
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

# NextGen

## 개요

NextGen은 차세대 크리에이터 육성 아카데미 플랫폼입니다. **웹·API·모바일 앱을 하나의 모노레포에서 관리**하고, 결제·영상·이메일·SMS·파일 업로드·운영 배포까지 포함한 구조로 설계했습니다.

강의 사이트는 **약 1개월의 개발 기간과 DRM 적용 조건** 안에서 실제 운영 가능한 상태로 출시해야 했습니다. 결제부터 수강 권한 부여, DRM 영상 재생까지 사용자가 거치는 구간을 나눠 점검했습니다.

Next.js 웹, Fastify API, Expo 모바일 앱, PostgreSQL·Redis, S3·CloudFront, Mux, TossPayments, Resend, Naver SENS, Terraform, GitHub Actions, Vercel, AWS EC2·ECR 기반 배포 흐름을 구성했습니다.

## 내 역할

- Next.js·Fastify·Expo 기반 모노레포 구조와 개발 환경을 구축했습니다.
- API·웹·모바일 앱과 공유 패키지를 관리하는 Turborepo 기반 개발 흐름을 구성했습니다.
- 강의 수강, 영상 보호, 결제, 사용자 인증, 운영 배포가 연결되는 **핵심 제품 흐름**을 설계하고 구현했습니다.
- AWS EC2·ECR, nginx 블루-그린 배포, Vercel 사전 빌드 배포, Terraform 인프라, **GitHub Actions CI/CD**를 구성했습니다.
- 개발·운영 환경변수, SSM Parameter Store, Secrets Manager, RDS, S3·CloudFront 동기화 흐름을 정리했습니다.

## 문제와 해결

- 문제: 웹·API·모바일·인프라에 환경변수와 배포 설정이 분산되어 설정 기준을 추적하기 어려웠습니다.
- 해결: 환경별 `.env`, SSM Parameter Store, EAS 프로필, Vercel 환경변수, AWS Secrets Manager의 용도를 구분하고 **README에 운영 절차를 정리**했습니다.

- 문제: 이전 CI 실행이 뒤늦게 성공하거나 배포 중 마이그레이션이 실패하면 잘못된 버전이 운영 환경에 반영될 수 있었습니다.
- 해결: 브랜치별 배포 워크플로, 동시 실행 제한, 최신 커밋 검증, 마이그레이션 실패 시 배포 중단, 블루-그린 전환 흐름을 구성했습니다.

- 문제: 짧은 개발 기간 안에 DRM 적용, 강의 수강 권한, 결제 후 접근, 피크 트래픽 대응을 함께 완성해야 했습니다.
- 해결: 수강 플로우와 영상 보호 정책, 결제 상태, 배포 안정성을 분리해 점검하고, 출시 전후 장애 가능성이 높은 구간을 우선적으로 안정화했습니다.

## 수치화된 성과

- **약 1개월의 개발 기간** 안에 강의 사이트를 출시했습니다.
- **피크 타임 동시 접속자 1,000명 규모에서도 오류율 0%를 기록**했습니다.
- **일일 최대 매출 약 6,000만 원 규모의 서비스**를 개발·운영했습니다.
- web, api, mobile 3개 앱과 types, utils, api-client, auth, config 등 5개 공유 package를 monorepo에 구성했습니다.
- GitHub Actions에서 CI·개발 배포·운영 배포·iOS TestFlight·App Store 제출 후보 빌드 워크플로를 설계했습니다.
- AWS, Vercel, Cloudflare, EAS, SSM, Secrets Manager까지 6개 이상의 운영 계층을 하나의 배포 문서로 정리했습니다.
