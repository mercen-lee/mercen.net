---
title: FlowKit
description: A **push/pop-based navigation library** for SwiftUI
logo_image: ../../images/projects/flowkit.webp
period: 2023.12 ~ 2025.12
source_code: Source available · Swift Package code is available
related_projects:
  - ../team/toongether.md
links:
  - label: Source Code
    url: https://github.com/Mercen-Lee/FlowKit
tech_stacks:
  - Swift
  - SwiftUI
  - UIKit
  - Swift Package Manager
  - TCA
---

# FlowKit

## Overview

FlowKit is a navigation library that brings explicit operations such as **push, pop, popToRoot, replace, sheet, and alert** to SwiftUI in a way that resembles UIKit's navigation stack. It began as a solution for reliable navigation in the complex [Toongether](../team/toongether.md) application and was later packaged as a reusable **Swift Package**.

## My Role

- Designed an **API that bridges SwiftUI's declarative view model with imperative navigation requirements**.
- Combined SwiftUI with UINavigationController to support iOS 13 and later.
- Added dependency-based usage examples so navigation could be triggered from reducers in TCA (The Composable Architecture).
- Prepared the README, installation instructions, and examples so the implementation could be used as a standalone package rather than an internal project utility.

## Problems and Solutions

- Problem: Early versions of SwiftUI's NavigationLink did not make it easy to control push and pop operations from anywhere in an application.
- Solution: Separated responsibilities between the View and navigation controller through `FlowPresenter`, `@Flow`, and `FlowProvider`.

- Problem: TCA-based projects sometimes need to trigger navigation side effects from reducers outside the View layer.
- Solution: Designed dependency injection in the style of `swift-dependencies`, allowing reducers to access FlowProvider.

## Quantified Results

- Packaged the library as a **Swift Package supporting iOS 13 and later**.
- Unified **more than seven core navigation operations**—including push, pop, popToRoot, replace, reload, sheet, and alert—behind one API.
- Adopted by at least three school projects.
