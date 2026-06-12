---
title: Amaze
description: Rust로 직접 구현하는 **멀티플랫폼 AI-friendly 게임 엔진**
period: 2026.05 ~
source_code: 소스 비공개 · 개발 중인 엔진으로, 요청 시 공유 가능
vibe_coded: true
tech_stacks:
  - Rust
  - Metal
  - Vulkan
  - DirectX 12
  - WebGPU
  - MCP
---

# Amaze

## 개요

Amaze는 **Rust 기반의 멀티플랫폼 게임 엔진**입니다. README 기준으로 렌더링 HAL, 오디오 HAL, 물리, 네트워킹, 텍스트 셰이핑, ICU i18n, OpenXR, MCP 서버, 셰이더 컴파일러까지 자체 구현 범위로 잡고 있습니다.

목표는 단일 소스 트리에서 macOS, iOS, Windows, Linux, Android, Web을 지원하고, AI agent가 엔진 내부를 다룰 수 있도록 **MCP와 SKILL bundle을 일급 기능**으로 제공하는 것입니다.

## 내 역할

- 프로젝트의 기술 방향과 workspace 구조를 설계했습니다.
- 엔진, 플랫폼, 백엔드, foundation crate를 분리해 **기능 확장이 가능한 구조**를 만들었습니다.
- 렌더링, 오디오, 물리, XR, 네트워킹, MCP tooling의 구현 범위와 계획 기능을 README와 문서에 명확히 정리했습니다.
- AI agent가 이해할 수 있는 문서, 예제, skill bundle 중심의 개발 경험을 설계했습니다.

## 문제와 해결

- 문제: `wgpu`, `winit`, Bevy, Rapier, SDL 같은 큰 하위 런타임에 의존하지 않는 엔진은 구현 범위가 쉽게 흐려집니다.
- 해결: 엔진 코어, 플랫폼 런타임, GPU/audio 백엔드, foundation 기능을 workspace 레벨에서 분리하고, 계획 기능과 현재 scaffold 기능을 README에서 구분했습니다.

- 문제: 게임 엔진은 사람만 쓰는 SDK가 아니라 AI agent도 다룰 수 있어야 했습니다.
- 해결: MCP live tooling, machine-readable docs, SKILL bundle을 제품 범위에 포함해 **엔진 조작과 문서 탐색을 자동화 가능한 작업**으로 정의했습니다.

## 수치화된 성과

- README 기준 **6개 OS 런타임과 5개 GPU 백엔드, 5개 오디오 백엔드**를 목표 플랫폼 매트릭스로 정리했습니다.
- **예제 22개와 AI agent용 skill bundle**을 포함한 workspace 구조를 설계했습니다.
- Determinism, XR, world streaming, networking, MCP tooling 등 대형 엔진 기능을 crate 단위로 나눠 장기 구현 가능한 구조를 만들었습니다.
