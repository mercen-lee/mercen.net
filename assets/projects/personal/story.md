---
title: Story
description: XML 기반 **비주얼 노벨 스토리 포맷과 파서, StoryMaker GUI 편집기**
period: 2024.07 ~ 2025.12
source_code: 소스 공개 · 패키지와 편집기 코드 확인 가능
related_projects:
  - ../team/loveandcode.md
links:
  - label: Pub
    url: https://pub.dev/packages/story_dart
  - label: StoryMaker
    url: https://github.com/progress-studio/StoryMaker
tech_stacks:
  - Dart
  - Flutter
  - XML
---

# Story

## 개요

Story는 비주얼 노벨 게임의 스토리, 대사, 배경, 효과, 분기 같은 연출 정보를 **XML 기반 포맷으로 표현하고 처리**하기 위한 라이브러리입니다. [Love & Code](../team/loveandcode.md)에서 독자적인 스토리 표현과 특수 효과를 다루기 위해 만들었고, **StoryMaker GUI 편집기**를 통해 사람이 직접 편집할 수 있는 workflow까지 확장했습니다.

## 내 역할

- 비주얼 노벨에 필요한 스토리 명령과 장면 정보를 Story XML 포맷으로 정의했습니다.
- XML 파일을 파싱하고 게임 런타임에서 사용할 수 있는 구조로 처리하는 라이브러리를 만들었습니다.
- **StoryMaker 데스크톱 GUI 편집기**를 Flutter로 구현해 작가와 개발자가 XML을 직접 손으로 수정하지 않아도 되게 했습니다.
- [Love & Code](../team/loveandcode.md)의 게임 진행, 특수 효과, 페르소나 대화 흐름과 연결될 수 있는 형태로 설계했습니다.

## 문제와 해결

- 문제: 비주얼 노벨은 단순 대사 목록이 아니라 캐릭터, 배경, 효과, 분기, 진행 상태가 함께 움직입니다.
- 해결: 스토리 데이터를 XML 기반 구조로 분리해 **콘텐츠와 렌더링 로직**을 나눴습니다.

- 문제: XML 포맷은 개발자에게는 명확하지만, 콘텐츠 작성자가 직접 편집하기에는 부담이 큽니다.
- 해결: StoryMaker 편집기를 만들어 GUI에서 장면과 명령을 조작하고 결과를 XML로 저장할 수 있게 했습니다.

## 수치화된 성과

- [Love & Code](../team/loveandcode.md)에서 실제 게임 스토리 처리에 사용되는 전용 포맷으로 설계했습니다.
- **라이브러리와 GUI 편집기**를 함께 만들어 포맷 설계, 파싱, 편집 workflow를 한 번에 검증했습니다.
- 작은 기능이라도 완성 가능한 단위로 끝까지 구현하며 게임 개발 생산성을 높였습니다.
