---
title: Toongether
description: An open webtoon publishing service that **reduces creators' dependence on major platforms**
logo_image: ../../images/projects/toongether.webp
mockup_images:
  - ./toongether/toongether-1.webp
  - ./toongether/toongether-2.webp
  - ./toongether/toongether-3.webp
  - ./toongether/toongether-4.webp
  - ./toongether/toongether-5.webp
period: 2022.09 ~ 2024.09
team: Progress
source_code: Current source is private and available on request · The legacy version is public on GitHub
team_ref: ./toongether.md
award: Top Excellence Award, SK Smarteen App+ Challenge 2023
award_ref: ../../awards.json#/11
tech_stack_refs:
  FlowKit: ../personal/flowkit.md
related_projects:
  - ../personal/flowkit.md
links:
  - label: Legacy GitHub
    url: https://github.com/toongether-legacy
  - label: Article
    url: https://game.donga.com/109760/
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Concurrency
  - TCA
  - Alamofire
  - Kingfisher
  - FlowKit
---

# Toongether

## Overview

Toongether is a web and mobile platform that lets webtoon creators **publish freely without complex contract procedures**. It aimed to provide creators with publishing opportunities and an automated release environment, while giving readers convenient discovery and reading experiences across a broad range of genres.

The team consisted of one iOS developer, one Android developer, two web developers, and two server developers.

## My Role

- Developed and released the **iOS application**.
- Created [FlowKit](../personal/flowkit.md), a push/pop-based navigation library designed for use with TCA.
- Led product direction, planning, design, development, deployment, and marketing as team leader and PM.
- Conducted tests and interviews with **webtoon creators, the product's primary users**, and incorporated their feedback into the product.

## Problems and Solutions

- Problem: The discovery screen needed to let readers scroll quickly while still understanding covers and episode information naturally.
- Solution: Implemented a custom scrollbar with SwiftUI GeometryReader and DragGesture, then refined the browsing flow around mobile reading behavior.

- Problem: Serving as both PM and iOS developer required simultaneous control of product direction and implementation speed.
- Solution: Combined creator interviews, reader feedback, competition milestones, and release schedules into one priority system for coordinating team scope.

## Quantified Results

- Received the **[Top Excellence Award at the SK Smarteen App+ Challenge 2023](../../awards.json#/11)**.
- Incorporated feedback from **approximately 300 readers and around ten creators**.
- Served as leader and PM for a six-person team spanning iOS, Android, web, and server development.
- Extracted [FlowKit](../personal/flowkit.md) into a standalone Swift Package so it could be reused beyond Toongether.
