---
title: FlowKit
description: SwiftUI를 위한 **push/pop 기반 Navigation 라이브러리**
period: 2023.12 ~ 2025.12
source_code: 소스 공개 · Swift Package 코드 확인 가능
related_projects:
  - ../team/toongether.md
links:
  - label: 소스 코드
    url: https://github.com/Mercen-Lee/FlowKit
tech_stacks:
  - Swift
  - SwiftUI
  - UIKit
  - Swift Package Manager
  - TCA
---

# FlowKit

## 개요

FlowKit은 SwiftUI에서 UIKit의 navigation stack처럼 **push, pop, popToRoot, replace, sheet, alert** 등을 명확하게 다룰 수 있게 만든 navigation 라이브러리입니다. [Toongether](../team/toongether.md) 프로젝트에서 복잡한 화면 전환을 안정적으로 처리하기 위해 시작했고, 이후 다른 프로젝트에서도 재사용할 수 있는 **Swift Package**로 정리했습니다.

## 내 역할

- SwiftUI의 선언형 View 구조와 imperative navigation 요구사항 사이의 간극을 해결하는 **API를 설계**했습니다.
- iOS 13 이상에서 사용할 수 있도록 SwiftUI와 UINavigationController를 조합했습니다.
- TCA(The Composable Architecture) reducer 내부에서도 사용할 수 있게 dependency 기반 사용 예시를 만들었습니다.
- 프로젝트 내부 구현체가 아니라 외부 패키지로 쓸 수 있도록 README, 설치 방법, 예제를 정리했습니다.

## 문제와 해결

- 문제: SwiftUI 초기 버전의 NavigationLink만으로는 앱 전역에서 원하는 시점에 push/pop을 제어하기 어렵습니다.
- 해결: `FlowPresenter`, `@Flow`, `FlowProvider`를 통해 **View와 navigation controller 사이의 책임을 분리**했습니다.

- 문제: TCA 기반 프로젝트에서는 View 바깥의 reducer에서도 navigation side effect를 다룰 필요가 있었습니다.
- 해결: `swift-dependencies` 스타일의 dependency 주입으로 reducer에서 FlowProvider를 사용할 수 있게 설계했습니다.

## 수치화된 성과

- **iOS 13 이상을 지원하는 Swift Package**로 정리했습니다.
- push, pop, popToRoot, replace, reload, sheet, alert 등 **7개 이상의 핵심 navigation 동작**을 단일 API로 묶었습니다.
- 교내에서 3개 이상의 프로젝트가 FlowKit을 채택했습니다.
