---
title: Love & Code
description: 새내기 개발자들의 **첫 협업 경험**을 담은 비주얼 노벨 게임
logo_image: ../../images/projects/loveandcode.webp
mockup_images:
  - ./loveandcode/loveandcode-1.webp
  - ./loveandcode/loveandcode-2.webp
period: 2024.04 ~ 2024.09
source_code: 소스 비공개 · 요청 시 프로젝트 코드 공유 가능
award: SK Smarteen App+ Challenge 2024 우수상
award_ref: ../../awards.json#/16
tech_stack_refs:
  Story: ../personal/story.md
related_projects:
  - ../personal/story.md
tech_stacks:
  - Flutter
  - Dart
  - Kotlin Multiplatform
  - Compose Multiplatform
  - Ktor
  - MongoDB
  - GPT-4o mini
  - Story
---

# Love & Code

## 개요

Love & Code는 새내기 개발자들의 첫 협업 경험을 가볍게 즐길 수 있게 만든 비주얼 노벨 게임입니다. 실제 소프트웨어마이스터고 재학생과 개발자 지망생의 경험에서 출발해, **현실 기반 스토리와 캐릭터 페르소나 AI 채팅**을 결합했습니다.

팀은 개발자 3명과 일러스트레이터 2명으로 구성되었습니다.

## 내 역할

- Android, iOS, Desktop을 하나의 코드베이스로 개발하기 위해 **Flutter 전환**을 주도했습니다.
- 비주얼 노벨 스토리 표현을 위한 [Story](../personal/story.md) 포맷과 라이브러리를 직접 설계했습니다.
- GPT-4o mini와 Ktor를 활용한 **캐릭터 페르소나 AI 채팅 기능**을 설계하고 개발했습니다.
- PM으로 팀 리딩, 기획, 디자인, 개발, 베타 테스트, 마케팅을 주도했습니다.

## 문제와 해결

- 문제: 초기에는 Kotlin Multiplatform과 Compose Multiplatform으로 시작했지만, 게임 UI와 다중 플랫폼 배포를 빠르게 안정화하기 어려웠습니다.
- 해결: Flutter로 전환해 **Android, iOS, Desktop을 하나의 코드베이스로 관리**하고, 게임 화면 구현 속도를 높였습니다.

- 문제: 일반 비주얼 노벨과 차별화하려면 사용자가 캐릭터와 직접 상호작용하는 경험이 필요했습니다.
- 해결: 캐릭터 성격과 진행 상황을 반영한 페르소나 AI 채팅을 붙여, 정해진 대사 외에도 몰입감을 주는 대화를 만들었습니다.

## 수치화된 성과

- **[SK Smarteen App+ Challenge 2024](../../awards.json#/16) 우수상**을 수상했습니다.
- 개발자 3명, 일러스트레이터 2명 규모의 팀에서 PM과 핵심 클라이언트 개발을 동시에 수행했습니다.
- KMP/Compose 기반 초기 구조를 Flutter 단일 코드베이스로 전환해 Android, iOS, Desktop 개발 범위를 통합했습니다.
- [Story](../personal/story.md) 포맷과 AI 채팅 기능을 통해 일반 비주얼 노벨과 다른 상호작용 기능을 구현했습니다.
