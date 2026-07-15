---
title: Desktop Fushi
description: A project that brings FUSHI, the mascot of **Cosmic Princess Kaguya!**, to life as a **desktop pet**
logo_image: ../../images/projects/desktop-fushi.webp
mockup_images:
  - ./desktop-fushi/desktop-fushi.webp
period: 2026.06 ~
source_code: Source available · Project code is available on GitHub
vibe_coded: true
links:
  - label: Source Code
    url: https://github.com/mercen-lee/desktop-fushi
  - label: Website
    url: https://desktopfushi.mercen.net
tech_stacks:
  - Rust
  - Direct2D
  - Metal
---

# Desktop Fushi

## Overview

Desktop Fushi is a personal project that implements the character FUSHI as a **desktop pet that moves naturally across the user's workspace**. Instead of placing the character inside a conventional application window, the project uses **platform-specific graphics APIs and window layering** to integrate FUSHI with the desktop itself.

## My Role

- Designed a **desktop overlay architecture** that accounts for both Windows and macOS.
- Prototyped Direct2D rendering on Windows and Metal-based rendering on macOS.
- Investigated desktop-pet-specific interactions including transparent windows, click-through behavior, animation-frame rendering, and screen-boundary handling.

## Problems and Solutions

- Problem: Unlike a conventional GUI application, a desktop pet depends on platform-specific behavior for **background transparency, input events, window levels, and rendering timing**.
- Solution: Kept shared behavior in Rust while isolating platform graphics and window integration behind thin backend layers.

- Problem: The character must feel present without interfering with the user's work.
- Solution: Separated click-through and interactive states, and designed animation and position updates to avoid overloading the UI thread.

## Quantified Results

- Created an initial **multi-backend architecture** that accounts for rendering paths on both Windows and macOS.
- Organized Direct2D and Metal integration within a single project architecture.
- The project remains in active development, with platform-level technical validation prioritized over final performance measurements.
