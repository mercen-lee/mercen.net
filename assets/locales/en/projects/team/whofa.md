---
title: WHOFA
description: A fan-and-artist service where I **developed iOS features in Swift and led the migration to Flutter**
logo_image: ../../images/projects/whofa.webp
period: 2025.09 ~ 2026.02
team: WHOFA Inc.
source_code: Private source · Disclosure is restricted because this is a company-managed codebase
team_ref: ../../career.json#/1
career_ref: ../../career.json#/1
tech_stacks:
  - Swift
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

WHOFA is a **service connecting fans and artists**. I developed new profile and community features for its iOS app in Swift, maintained existing functionality, and later led the migration to Flutter. The product includes authentication, community, Preplay, profiles, rewards, notifications, and media processing.

At [WHOFA](../../career.json#/1), I owned work from iOS feature development through the Flutter migration, while treating **navigation, media interaction, and community usability** as product-quality concerns.

## My Role

- Developed new **profile and community features in Swift** and maintained the existing iOS application.
- Led the existing iOS application's **migration to Flutter and Riverpod**, implementing its screen and state architecture.
- Worked across Preplay detail, iOS-style navigation, deep linking, on-device databases, and media processing.
- Resolved **user-facing issues** including image downloads, audio attachment crashes, relative-time errors, tab selection defects, and stale state initialization.
- Improved platform-specific UI details including iOS blur, refresh indicators, and Hero animations.
- Brought features to a user-visible level of polish, addressing **crashes, navigation, animation, and media edge cases** rather than stopping at basic feature completion.

## Problems and Solutions

- Problem: Maintaining Swift-based iOS features while migrating to Flutter widened the change surface across screen state, deep links, on-device data, and media processing.
- Solution: Led the migration by defining Riverpod providers and feature-oriented screen structures, then separated the on-device database, network mappers, and media preprocessor to reduce the scope of changes.

- Problem: iOS-style navigation and Hero animations sometimes conflicted with Flutter defaults and the product's desired interaction model.
- Solution: Adjusted the application router and transition architecture, then improved temporary Hero handling, blur, and refresh behavior incrementally.

## Quantified Results

- Led the existing iOS application's **migration to Flutter** within a four-person product team.
- Implemented new **profile and community features in Swift** and maintained the existing iOS application.
- Handled multiple operational user touchpoints—including authentication, community, media, notifications, and rewards—within one production product.
