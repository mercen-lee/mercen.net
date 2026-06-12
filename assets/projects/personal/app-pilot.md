---
title: App Pilot
description: 터치와 드래그만으로 **실제 iOS 앱을 만들 수 있는** SwiftUI 기반 WYSIWYG 노코드 앱 개발 서비스
period: 2024.02
source_code: 소스 공개 · Swift Playgrounds 프로젝트 코드 확인 가능
award: Apple WWDC Swift Student Challenge 2024 우승
award_ref: ../../awards.json#/14
related_projects:
  - ./allergist.md
links:
  - label: 소스 코드
    url: https://github.com/Mercen-Lee/App-Pilot
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Playgrounds
---

# App Pilot

## 개요

App Pilot은 **터치와 드래그만으로 컴포넌트를 조합해 실제 iOS 앱을 만들 수 있는** 노코드 앱 개발 서비스입니다. **[Apple WWDC Swift Student Challenge 2024](../../awards.json#/14) 우승작**으로 선정되었고, Swift Playgrounds 환경에서 실행되는 WYSIWYG 편집기를 목표로 만들었습니다.

단순히 화면을 꾸미는 데서 끝내지 않고, 사용자가 구성한 화면 구조를 **SwiftUI 코드와 동일한 개념으로 표현하고 다시 앱으로 추출**할 수 있게 설계했습니다.

[Allergist](./allergist.md)에 이어 **두 번째 Apple Swift Student Challenge 우승**으로 이어진 프로젝트이며, 이 성과를 계기로 WWDC24 기간 Apple Park에 초대받았습니다.

## 내 역할

- 전체 앱 구조와 편집기 UX를 설계하고 SwiftUI로 구현했습니다.
- Image, VStack, Text 등 주요 UI 컴포넌트마다 대리자 클래스를 만들어 작업물을 렌더링했습니다.
- Xcode에서 열 수 있는 `.swiftpm` 구조를 분석해, 사용자가 만든 앱을 동일한 형태로 내보내는 **Export 기능**을 구현했습니다.
- 미리보기와 코드 추출 흐름을 연결해 **"만든 화면이 실제 앱이 된다"는 경험을 완성**했습니다.

## 문제와 해결

- 문제: SwiftUI의 선언형 View 구조를 사용자의 드래그 기반 편집 작업물로 다시 표현해야 했습니다.
- 해결: 모든 컴포넌트를 내부 모델과 대리자 클래스로 분리해, 편집기 상태와 렌더링 결과를 동기화했습니다.

- 문제: Swift Playgrounds 안에서 생성한 결과물을 Xcode 프로젝트처럼 다시 열 수 있어야 했습니다.
- 해결: `.swiftpm` 패키지 구조를 분석하고, 사용자의 View 트리를 Swift 파일과 리소스 구조로 변환하는 Export 파이프라인을 만들었습니다.

## 수치화된 성과

- [WWDC Swift Student Challenge 2024](../../awards.json#/14) 우승작으로 선정되었습니다.
- **Apple Swift Student Challenge 2회 연속 우승**을 달성했습니다.
- Swift Playgrounds 단일 프로젝트 안에서 **편집, 미리보기, 코드 추출까지 하나의 흐름**으로 연결했습니다.
- 컴포넌트별 대리자 구조를 도입해 렌더링과 Export 로직을 분리했고, 새 컴포넌트 추가 비용을 낮췄습니다.
