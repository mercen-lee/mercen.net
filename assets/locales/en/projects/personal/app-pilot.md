---
title: App Pilot
description: A SwiftUI WYSIWYG no-code service for building **real iOS apps through touch and drag interactions**
logo_image: ../../images/projects/app-pilot.webp
mockup_images:
  - ./app-pilot/app-pilot-1.webp
  - ./app-pilot/app-pilot-2.webp
  - ./app-pilot/app-pilot-3.webp
period: 2024.02
source_code: Source available · Swift Playgrounds project code is available
award: Winner, Apple WWDC Swift Student Challenge 2024
award_ref: ../../awards.json#/14
related_projects:
  - ./allergist.md
links:
  - label: Source Code
    url: https://github.com/Mercen-Lee/App-Pilot
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Playgrounds
---

# App Pilot

## Overview

App Pilot is a no-code application development service that lets users **combine components through touch and drag interactions to create a real iOS app**. It was selected as a **[winner of the Apple WWDC Swift Student Challenge 2024](../../awards.json#/14)** and was built as a WYSIWYG editor that runs inside Swift Playgrounds.

Rather than stopping at visual screen composition, the editor represents the user's layout through concepts aligned with **SwiftUI code and exports it back into a runnable application**.

Following [Allergist](./allergist.md), this became my **second Apple Swift Student Challenge win** and led to an invitation to Apple Park during WWDC24.

## My Role

- Designed the entire application architecture and editor experience, then implemented it in SwiftUI.
- Created proxy classes for major UI components such as Image, VStack, and Text to render user-authored work.
- Analyzed the `.swiftpm` structure that Xcode can open and built an **export feature** that emits a user's application in the same format.
- Connected preview and code generation into a complete experience in which **the screen a user builds becomes a real app**.

## Problems and Solutions

- Problem: SwiftUI's declarative view hierarchy had to be represented as a mutable, drag-driven editing document.
- Solution: Separated every component into an internal model and proxy class, keeping editor state synchronized with rendered output.

- Problem: A project generated inside Swift Playgrounds needed to reopen like an Xcode project.
- Solution: Reverse-engineered the `.swiftpm` package structure and built an export pipeline that converts the user's view tree into Swift files and resources.

## Quantified Results

- Selected as a [winner of the WWDC Swift Student Challenge 2024](../../awards.json#/14).
- Achieved **two consecutive Apple Swift Student Challenge wins**.
- Connected **editing, preview, and code export in a single Swift Playgrounds project**.
- Reduced the cost of adding new components by separating rendering and export logic through a component proxy architecture.
