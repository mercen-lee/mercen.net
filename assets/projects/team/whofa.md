---
title: WHOFA
description: 팬과 아티스트 경험을 연결하는 **Flutter 기반 모바일/웹 앱**
period: 2025.09 ~ 2026.02
team: 주식회사 후파
source_code: 소스 비공개 · 회사 관리 코드베이스로 공개 제한
team_ref: ../../career.json#/1
career_ref: ../../career.json#/1
tech_stacks:
  - Flutter
  - Dart
  - Riverpod
  - Drift
  - SQLite
  - Firebase
  - Dio
  - GoRouter
---

# WHOFA

## 개요

WHOFA는 **팬과 아티스트 경험을 연결하는 Flutter 기반 앱**입니다. 모바일과 웹 빌드를 모두 고려하고 있으며, 인증, 커뮤니티, Preplay, 프로필, 보상, 알림, 미디어 처리 등 복합 기능을 가진 서비스입니다.

국내 기업 [WHOFA](../../career.json#/1)의 주요 제품 개발에 참여하며, 사용자가 앱에서 처음 마주하는 **화면 전환, 미디어 경험, 커뮤니티 사용성**까지 제품 완성도 관점에서 다뤘습니다.

## 내 역할

- Flutter/Riverpod 기반 기능 개발과 버그 수정을 담당했습니다.
- 커뮤니티, 프로필, Preplay 상세 화면, iOS 스타일 navigation, 딥링크, 온디바이스 DB, 미디어 처리 영역을 다뤘습니다.
- 이미지 다운로드, 오디오 첨부 crash 수정, 상대 시간/탭 선택/상태 초기화 버그 수정 등 **사용자 경험에 직접 영향을 주는 문제**를 해결했습니다.
- iOS blur, refresh indicator, Hero animation 등 플랫폼별 UI 디테일을 개선했습니다.
- 기능 구현에서 끝내지 않고 **crash, navigation, animation, media edge case**까지 사용자가 체감하는 완성도를 기준으로 마무리했습니다.

## 문제와 해결

- 문제: 커뮤니티와 Preplay 기능은 텍스트, 이미지, 오디오, 공유, 딥링크가 함께 움직이기 때문에 상태 관리가 복잡했습니다.
- 해결: Riverpod provider와 feature 단위 화면 구조를 유지하면서, 온디바이스 DB와 네트워크 mapper, media preprocessor를 분리해 변경 범위를 좁혔습니다.

- 문제: iOS 스타일 navigation과 Hero animation을 적용하면서 Flutter 기본 동작과 서비스 UX가 충돌하는 지점이 있었습니다.
- 해결: App router와 화면 전환 구조를 조정하고, 임시 Hero 처리와 blur/refresher 동작을 단계적으로 개선했습니다.

## 수치화된 성과

- 커뮤니티, 프로필, Preplay, 딥링크, 온디바이스 DB, 미디어 처리 등 **6개 이상의 기능 영역**을 다뤘습니다.
- Flutter WebAssembly 빌드 경로까지 포함된 멀티플랫폼 Flutter 프로젝트에서 기여했습니다.
- 인증, 커뮤니티, 미디어, 알림, 보상 등 실제 서비스 운영에 필요한 여러 사용자 접점을 한 제품 안에서 다뤘습니다.
