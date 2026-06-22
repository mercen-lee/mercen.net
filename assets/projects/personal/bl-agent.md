---
title: BL Agent
description: 포워딩 업무에서 **B/L PDF 문서의 주요 정보를 추출하고 기존 XLS 양식으로 저장**하는 데스크톱 앱
logo_image: ../../images/projects/bl-agent.webp
period: 2026.06 ~
project_group: company
source_code: 소스 비공개 · 외주 계약 범위에 따라 공개 제한
vibe_coded: true
tech_stacks:
  - React
  - TypeScript
  - Tauri
  - Rust
  - SQLite
  - OpenAI API
---

# BL Agent

## 개요

BL Agent는 포워딩 업무에서 **B/L PDF 문서의 주요 정보를 추출하고, 검토 후 기존 `.xls` 양식으로 저장**하는 데스크톱 앱입니다. React 기반 UI와 Tauri/Rust 백엔드를 사용해 데스크톱 앱으로 패키징했고, 문서 목록, 추출 상태, 검토 화면, XLS export 흐름을 하나의 업무 도구로 묶었습니다.

단순 OCR 데모가 아니라 **실제 납품 가능한 품질**을 목표로, 모델 설정, 추출 상태 표시, 취소/재시작 UX, Windows 설치 패키징까지 다듬었습니다.

## 내 역할

- 기존 BL Reader의 제품 정체성을 BL Agent로 전면 전환하고 앱 메타데이터, 릴리즈 산출물, 문서, 앱 저장 키를 정리했습니다.
- PDF 문서 처리와 필드 검토 UI, 추출 결과 저장, XLS export 흐름을 설계했습니다.
- **Tauri v2 권한, Windows NSIS 설치 파일, macOS 앱 번들** 등 데스크톱 배포 품질 이슈를 직접 해결했습니다.
- 실무자가 이해하기 쉬운 한국어 업무 문구와 `처리`, `검토`, `저장` 같은 상태 표현을 분리했습니다.

## 문제와 해결

- 문제: 사용자가 중단을 눌렀을 때 "취소 요청" 상태로 오래 머무르면 업무 도구로서 신뢰가 떨어졌습니다.
- 해결: 즉시 중단 UX를 우선하고, 재시작 시 보이는 문서 목록은 비우되 문서별 추출 이력은 보존하도록 **런타임 상태와 저장 데이터를 분리**했습니다.

- 문제: Tauri v2에서 창의 X 버튼이 닫히지 않는 네이티브 권한 문제가 발생했습니다.
- 해결: close handler만 보지 않고 capability manifest까지 추적해 `core:window:allow-destroy` 권한을 추가하는 방식으로 원인을 해결했습니다.

- 문제: Windows 배포에서 설치 파일 이름, 아이콘, 한국어 설치 UI, NSIS 이미지 경고까지 제품 품질에 영향을 주는 세부 사항이 많았습니다.
- 해결: 릴리즈 workflow와 Tauri bundle 설정을 정리하고, 단일 Windows 설치 파일과 브랜드 이미지가 일관되게 나오도록 패키징 구성을 다듬었습니다.

## 수치화된 성과

- 클라이언트사의 **직원 6명치 일**을 현재까지도 이 프로그램이 수행하고 있습니다.
- 제품 버전 1.0.x 기준 macOS 앱 번들과 Windows 설치 패키지 산출물을 검증했습니다.
- React/TypeScript 프론트엔드와 Rust/Tauri 백엔드를 함께 테스트하는 검증 흐름을 운영했습니다.
- 릴리즈 전 **SQLite id 정책, 추출 상태 동기화, 창 닫기 권한, NSIS 패키징** 등 여러 배포 차단 이슈를 해결했습니다.
