---
title: Allergist
description: 사용자의 알레르기 정보에 맞춰 **식품 알레르기 유발물질을 확인**하는 iOS 서비스
logo_image: ../../images/projects/allergist.webp
mockup_images:
  - ./allergist/allergist-1.webp
  - ./allergist/allergist-2.webp
  - ./allergist/allergist-3.webp
period: 2023.04
source_code: 소스 공개 · GitHub에서 iOS 앱 코드 확인 가능
award: Swift Student Challenge Winner, 2023
award_ref: ../../awards.json#/7
related_projects:
  - ./app-pilot.md
links:
  - label: 소스 코드
    url: https://github.com/Mercen-Lee/Allergist
  - label: 회고록
    url: https://blog.mercen.net/24
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Playgrounds
  - Property List
---

# Allergist

## 개요

Allergist는 사용자의 알레르기 정보에 기반해 **식품 알레르기 유발물질을 확인**할 수 있게 만든 iOS 서비스입니다. 식품 알레르기로 불편을 겪었던 개인 경험에서 출발했고, **[Swift Student Challenge Winner, 2023](../../awards.json#/7)**로 선정되었습니다.

미국 현지 공모전 맥락에 맞춰 알레르기 유발물질 분류 기준과 모든 문자열을 영어로 구성했습니다.

## 내 역할

- 서비스 아이디어, 데이터 구조, 검색 UX, 설정 화면을 모두 설계하고 SwiftUI로 구현했습니다.
- 사용자가 선택한 알레르기 항목을 기준으로 식품 목록을 탐색하고 **위험 항목을 빠르게 확인**할 수 있게 만들었습니다.
- 오프라인 Swift Playgrounds 환경에서도 동작하도록 식품 데이터를 앱 내부에 포함했습니다.
- 데이터 용량 제한 안에서 검색 가능한 형태로 식품 정보를 로딩하는 최적화 작업을 수행했습니다.

## 문제와 해결

- 문제: 오프라인 환경과 25MB 용량 제한 안에서 **558,728건의 식품 데이터**를 다뤄야 했습니다.
- 해결: plist 기반 저장과 데이터 클러스터링을 적용해 **초기 로딩을 약 1분에서 약 3초로 단축**했습니다.

- 문제: 알레르기 정보는 단순 검색보다 사용자의 개인 설정과 함께 해석되어야 했습니다.
- 해결: 검색 화면과 알레르기 설정 화면을 분리하고, 식품별 위험 정보를 사용자 설정에 맞춰 강조했습니다.

## 수치화된 성과

- **558,728건의 식품 데이터**를 앱 내부에서 다뤘습니다.
- 초기 데이터 로딩 시간을 **약 1분에서 약 3초**로 줄였습니다.
- **[Swift Student Challenge Winner, 2023](../../awards.json#/7)**로 선정되었습니다.
- 이후 [App Pilot](./app-pilot.md)까지 이어지는 2년 연속 Swift Student Challenge Winner의 첫 번째 프로젝트가 되었습니다.
