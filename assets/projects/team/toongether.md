---
title: Toongether
description: 작가의 **플랫폼 의존도를 줄이는** 웹툰 자유 연재 서비스
period: 2022.09 ~ 2024.09
team: Progress
source_code: 현재 소스 비공개 · 요청 시 공유 가능, 레거시 버전은 GitHub 공개
team_ref: ./toongether.md
award: SK Smarteen App+ Challenge 2023 최우수상
award_ref: ../../awards.json#/11
tech_stack_refs:
  FlowKit: ../personal/flowkit.md
related_projects:
  - ../personal/flowkit.md
links:
  - label: 레거시 GitHub
    url: https://github.com/toongether-legacy
  - label: 기사
    url: https://game.donga.com/109760/
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Concurrency
  - TCA
  - Alamofire
  - Kingfisher
  - FlowKit
---

# Toongether

## 개요

Toongether는 웹툰 작가들이 복잡한 계약 절차 없이 **자유롭게 웹툰을 연재**할 수 있도록 만든 웹/앱 플랫폼입니다. 작가에게는 연재 기회와 자동화된 연재 환경을 제공하고, 독자에게는 장르의 경계가 낮은 작품 탐색과 편리한 열람 환경을 제공하는 것을 목표로 했습니다.

팀은 iOS 1명, Android 1명, 웹 2명, 서버 2명으로 구성되었습니다.

## 내 역할

- **iOS 애플리케이션 개발과 출시**를 담당했습니다.
- TCA에서 사용할 수 있는 push/pop 기반 navigation 라이브러리 **[FlowKit](../personal/flowkit.md)을 직접 개발**했습니다.
- 리더 겸 PM으로 팀 리딩, 기획, 디자인, 개발, 배포, 마케팅을 주도했습니다.
- 주 사용자인 **웹툰 작가를 대상으로 테스트와 인터뷰**를 진행해 피드백을 제품에 반영했습니다.

## 문제와 해결

- 문제: 웹툰 탐색 화면은 독자가 빠르게 스크롤하면서도 작품 표지와 회차 정보를 자연스럽게 볼 수 있어야 했습니다.
- 해결: SwiftUI의 GeometryReader와 DragGesture를 활용해 커스텀 스크롤 바를 구현하고, 모바일 독서 경험에 맞춰 탐색 흐름을 다듬었습니다.

- 문제: PM과 iOS 개발을 동시에 맡으면서 제품 방향과 구현 속도를 모두 관리해야 했습니다.
- 해결: 작가 인터뷰, 독자 피드백, 수상 대회 일정, 앱 배포 일정을 하나의 우선순위로 묶어 팀의 작업 범위를 조율했습니다.

## 수치화된 성과

- **[SK Smarteen App+ Challenge 2023](../../awards.json#/11) 최우수상**을 수상했습니다.
- **약 300명의 독자와 10여 명의 작가 피드백**을 수용했습니다.
- iOS, Android, 웹, 서버까지 총 6명 팀에서 리더와 PM 역할을 수행했습니다.
- [FlowKit](../personal/flowkit.md)을 별도 Swift Package로 분리해 Toongether 이후 다른 프로젝트에서도 재사용할 수 있게 했습니다.
