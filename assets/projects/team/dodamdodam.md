---
title: DodamDodam
description: 학생과 선생님의 **학교생활을 편리하게 만드는** 교내 스마트 스쿨 서비스
period: 2023.03 ~ 2024.04
team: B1ND
source_code: 소스 공개 · iOS 앱과 일부 서버 repo 확인 가능
team_ref: ./dodamdodam.md
links:
  - label: 소스 코드
    url: https://github.com/Team-B1ND/dodamdodam-ios
  - label: 웹 서비스
    url: https://dodam.b1nd.com
  - label: 공개 repo
    url: https://github.com/Team-B1ND/dodamdodam-server-v4
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Concurrency
  - MVVM
  - Clean Architecture
  - Tuist
  - Moya
---

# DodamDodam

## 개요

DodamDodam은 대구소프트웨어마이스터고 학생과 선생님의 학교생활을 편리하게 만드는 스마트 스쿨 서비스입니다. 급식 조회, 외출/외박, 상벌점 관리, 기상송 신청, 심야 자습 같은 **오프라인 행정/생활 절차를 웹과 앱으로 옮겼**습니다.

팀은 iOS 5명, Android 5명, 웹 6명, 서버 4명 규모였습니다.

## 내 역할

- DodamDodam **iOS 애플리케이션 개발과 출시**를 담당했습니다.
- 약 1년 동안 유지보수하며 심야 자습 기능과 급식 정보 제공 위젯을 포함한 **10개 버전**을 출시했습니다.
- Android Chapter와 협업해 모바일 앱 UI 디자인 통일을 추진했습니다.
- **PM으로 프로젝트 관리, 회의, 기록, 개발 Chapter 간 협업**을 주도했습니다.

## 문제와 해결

- 문제: 학생과 교직원이 매일 사용하는 서비스이기 때문에 작은 버그도 실제 학교생활에 영향을 줄 수 있었습니다.
- 해결: 기능 출시 전 사용 흐름을 반복 점검하고, 유지보수 기간 동안 안정성과 UX 일관성을 우선했습니다.

- 문제: iOS와 Android가 따로 개발되면 같은 기능도 서로 다른 사용 경험으로 느껴질 수 있었습니다.
- 해결: 모바일 앱의 디자인 언어와 화면 구조를 맞추기 위해 Android Chapter와 협업했고, 추후 유지보수를 쉽게 하기 위해 디자인 시스템 제작을 추진했습니다.

## 수치화된 성과

- **전교생 약 200명과 교직원 약 34명**이 매일 사용하는 서비스 개발에 참여했습니다.
- 1년간 유지보수하며 **10개의 iOS 버전**을 출시했습니다.
- iOS 5명, Android 5명, 웹 6명, 서버 4명 규모의 다분야 팀에서 PM 역할을 수행했습니다.
- 교내 학생들의 개발 역량에 긍정적 영향을 주기 위해 소스 코드 공개 방향을 결정했습니다.
