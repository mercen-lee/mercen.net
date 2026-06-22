---
title: Desktop Fushi
description: "'초 가구야 공주'의 마스코트 캐릭터 'FUSHI'를 **바탕화면 펫**으로 만드는 프로젝트"
logo_image: ../../images/projects/desktop-fushi.webp
mockup_images:
  - ./desktop-fushi/desktop-fushi.webp
period: 2026.06 ~
source_code: 소스 공개 · GitHub에서 프로젝트 코드 확인 가능
vibe_coded: true
links:
  - label: 소스 코드
    url: https://github.com/mercen-lee/desktop-fushi
  - label: 홈페이지
    url: https://desktopfushi.mercen.net
tech_stacks:
  - Rust
  - Direct2D
  - Metal
---

# Desktop Fushi

## 개요

Desktop Fushi는 캐릭터 FUSHI를 **바탕화면 위에서 살아 움직이는 데스크톱 펫**으로 구현하는 개인 프로젝트입니다. 일반 앱 창 안에 캐릭터를 넣는 것이 아니라, **OS별 그래픽 API와 윈도우 레이어링**을 활용해 사용자의 작업 공간 위에 자연스럽게 배치하는 것을 목표로 합니다.

## 내 역할

- Windows와 macOS를 모두 고려해 **데스크톱 오버레이 구조**를 설계했습니다.
- Windows에서는 Direct2D, macOS에서는 Metal 기반 렌더링을 사용하는 방향으로 실험했습니다.
- 투명 창, 클릭 통과, 애니메이션 프레임 렌더링, 화면 경계 처리 같은 데스크톱 펫 특유의 UX를 검토했습니다.

## 문제와 해결

- 문제: 데스크톱 펫은 일반 GUI 앱과 달리 **배경 투명도, 입력 이벤트, 창 레벨, 렌더링 타이밍**이 모두 OS별로 다릅니다.
- 해결: 공통 로직은 Rust로 두고, 플랫폼별 그래픽/윈도우 처리는 얇은 백엔드로 분리하는 구조를 선택했습니다.

- 문제: 사용자의 작업을 방해하지 않으면서 캐릭터가 존재감을 가져야 합니다.
- 해결: 클릭 통과와 상호작용 가능 상태를 분리하고, 애니메이션과 위치 업데이트를 UI 스레드에 과도하게 묶지 않는 방향으로 설계했습니다.

## 수치화된 성과

- Windows와 macOS 양쪽 렌더링 경로를 고려한 **멀티백엔드 구조**를 초기 설계했습니다.
- Direct2D와 Metal을 같은 프로젝트 안에서 다룰 수 있도록 기술 스택을 정리했습니다.
- 현재 진행 중 프로젝트로, 성능 수치보다 플랫폼별 기술 검증을 우선하고 있습니다.
