---
title: WHOFA
description: A **Flutter-based mobile and web application** connecting fan and artist experiences
logo_image: ../../images/projects/whofa.webp
period: 2025.09 ~ 2026.02
team: WHOFA Inc.
source_code: Private source · Disclosure is restricted because this is a company-managed codebase
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

## Overview

WHOFA is a **Flutter-based application connecting fan and artist experiences**. Designed for both mobile and web builds, it combines authentication, community, Preplay, profiles, rewards, notifications, and media processing in one service.

While contributing to the core product at [WHOFA](../../career.json#/1), I worked from a product-quality perspective across the experiences users encounter first: **navigation, media interaction, and community usability**.

## My Role

- Developed features and fixed defects in a Flutter and Riverpod codebase.
- Worked across community, profile, Preplay detail, iOS-style navigation, deep linking, on-device databases, and media processing.
- Resolved **user-facing issues** including image downloads, audio attachment crashes, relative-time errors, tab selection defects, and stale state initialization.
- Improved platform-specific UI details including iOS blur, refresh indicators, and Hero animations.
- Brought features to a user-visible level of polish, addressing **crashes, navigation, animation, and media edge cases** rather than stopping at basic feature completion.

## Problems and Solutions

- Problem: Community and Preplay features combine text, images, audio, sharing, and deep links, making state management complex.
- Solution: Preserved Riverpod providers and feature-oriented screen structures while separating the on-device database, network mappers, and media preprocessor to reduce the scope of changes.

- Problem: iOS-style navigation and Hero animations sometimes conflicted with Flutter defaults and the product's desired interaction model.
- Solution: Adjusted the application router and transition architecture, then improved temporary Hero handling, blur, and refresh behavior incrementally.

## Quantified Results

- Contributed across **more than six product areas**, including community, profile, Preplay, deep linking, on-device data, and media processing.
- Worked on a multiplatform Flutter project that included a Flutter WebAssembly build path.
- Handled multiple operational user touchpoints—including authentication, community, media, notifications, and rewards—within one production product.
