---
title: Love & Code
description: A visual novel game about **new developers' first collaborative project experience**
logo_image: ../../images/projects/loveandcode.webp
mockup_images:
  - ./loveandcode/loveandcode-1.webp
  - ./loveandcode/loveandcode-2.webp
period: 2024.04 ~ 2024.09
source_code: Private source · Project code can be shared on request
award: Excellence Award, SK Smarteen App+ Challenge 2024
award_ref: ../../awards.json#/16
tech_stack_refs:
  Story: ../personal/story.md
related_projects:
  - ../personal/story.md
tech_stacks:
  - Flutter
  - Dart
  - Kotlin Multiplatform
  - Compose Multiplatform
  - Ktor
  - MongoDB
  - GPT-4o mini
  - Story
---

# Love & Code

## Overview

Love & Code is a visual novel game that presents the first collaborative project experience of new developers in an approachable, entertaining form. Drawing on the real experiences of Software Meister High School students and aspiring developers, it combines a **realistic story with AI chats built around each character's persona**.

The team consisted of three developers and two illustrators.

## My Role

- Led the **migration to Flutter** so Android, iOS, and desktop versions could be developed from one codebase.
- Designed the custom [Story](../personal/story.md) format and library for expressing visual-novel scenarios.
- Designed and developed **character-persona AI chat** using GPT-4o mini and Ktor.
- Led team management, planning, design, development, beta testing, and marketing as PM.

## Problems and Solutions

- Problem: The project began with Kotlin Multiplatform and Compose Multiplatform, but stabilizing a game UI and multiplatform release process quickly was difficult.
- Solution: Migrated to Flutter, managing **Android, iOS, and desktop from one codebase** and accelerating game-screen implementation.

- Problem: Differentiating the product from a conventional visual novel required direct interaction between the player and its characters.
- Solution: Added persona-based AI chat that reflects character personality and story progress, creating immersive conversations beyond predetermined dialogue.

## Quantified Results

- Received the **[Excellence Award at the SK Smarteen App+ Challenge 2024](../../awards.json#/16)**.
- Simultaneously served as PM and a core client developer in a team of three developers and two illustrators.
- Consolidated the initial KMP and Compose architecture into a Flutter codebase spanning Android, iOS, and desktop.
- Implemented interaction beyond a conventional visual novel through the [Story](../personal/story.md) format and AI chat capability.
