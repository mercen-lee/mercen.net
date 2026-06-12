---
title: Windows 11 for Galaxy Tab 6 Lite
description: Galaxy Tab 6 Lite(Exynos 9611)에 **Windows 11 on ARM을 설치**하는 프로젝트
period: 2026.05 ~
source_code: 소스 비공개 · 포팅 실험 단계로, 요청 시 공유 가능
vibe_coded: true
tech_stacks:
  - C
  - ARM64 Assembly
  - ACPI ASL
  - Python
  - WDK
  - ADB
---

# Windows 11 for Galaxy Tab 6 Lite

## 개요

Windows 11 for Galaxy Tab 6 Lite는 **Exynos 9611 기반 Galaxy Tab S6 Lite에 Windows 11 on ARM을 구동**하기 위한 포팅 프로젝트입니다. Android 태블릿의 부트 체인, ACPI 테이블, 드라이버, 디바이스 트리 성격의 정보를 분석해 Windows가 인식할 수 있는 형태로 맞추는 **저수준 시스템 프로젝트**입니다.

## 내 역할

- 대상 디바이스의 하드웨어 구성과 부팅 흐름을 분석했습니다.
- **ACPI ASL, ARM64 어셈블리, C, Python 도구**를 조합해 Windows on ARM 포팅에 필요한 실험을 진행했습니다.
- ADB와 커스텀 recovery 환경을 사용해 반복적으로 이미지와 설정을 검증하는 흐름을 구성했습니다.

## 문제와 해결

- 문제: Android 기기에서 Windows를 부팅하려면 PC와 다른 펌웨어/ACPI/드라이버 계층을 Windows가 이해하는 형태로 맞춰야 합니다.
- 해결: 하드웨어 정보를 ACPI ASL로 표현하고, 부팅과 장치 초기화에 필요한 최소 경로부터 하나씩 검증하는 방식으로 접근했습니다.

- 문제: 부팅 실패 원인이 커널, ACPI, 저장소, 디스플레이, 드라이버 중 어디인지 바로 드러나지 않습니다.
- 해결: ADB, recovery, 로그 가능한 중간 단계, 작은 단위의 이미지 변경을 사용해 **실패 지점을 좁히는 반복 디버깅 흐름**을 만들었습니다.

## 수치화된 성과

- **Exynos 9611 기반 ARM64 태블릿**이라는 비표준 대상에서 Windows 11 on ARM 부팅 가능성을 검증하는 저수준 실험을 진행했습니다.
- C, ARM64 Assembly, ACPI ASL, Python, WDK, ADB를 함께 사용하는 포팅 작업 흐름을 정리했습니다.
- 현재 진행 중 프로젝트로, 완성 기능보다 부트/장치 인식 단계별 검증을 우선하고 있습니다.
