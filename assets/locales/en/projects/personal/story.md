---
title: Story
description: An XML-based **visual novel story format, parser, and StoryMaker GUI editor**
logo_image: ../../images/projects/story.webp
mockup_images:
  - ./story/story.webp
period: 2024.07 ~ 2025.12
source_code: Source available · Package and editor code are available
related_projects:
  - ../team/loveandcode.md
links:
  - label: Pub
    url: https://pub.dev/packages/story_dart
  - label: StoryMaker
    url: https://github.com/progress-studio/StoryMaker
tech_stacks:
  - Dart
  - Flutter
  - XML
---

# Story

## Overview

Story is a library for representing and processing visual-novel direction—including dialogue, backgrounds, effects, branches, and scene progression—through an **XML-based format**. I created it for [Love & Code](../team/loveandcode.md) to support custom story presentation and effects, then expanded the workflow with a human-friendly **StoryMaker GUI editor**.

## My Role

- Defined Story's XML format around the scene data and commands required by a visual novel.
- Built a library that parses XML files into structures the game runtime can execute.
- Implemented the **StoryMaker desktop GUI editor** in Flutter so writers and developers would not need to edit XML by hand.
- Designed the format to connect with the gameplay, special effects, and persona-conversation flow in [Love & Code](../team/loveandcode.md).

## Problems and Solutions

- Problem: A visual novel is not merely a list of dialogue; characters, backgrounds, effects, branches, and progress state all move together.
- Solution: Separated story data into an XML structure, dividing **content from rendering logic**.

- Problem: XML is precise for developers but burdensome for content authors to edit directly.
- Solution: Built StoryMaker so users can manipulate scenes and commands through a GUI and save the result back to XML.

## Quantified Results

- Designed the format for actual story processing in [Love & Code](../team/loveandcode.md).
- Validated the format, parser, and editing workflow together by delivering both **a library and a GUI editor**.
- Improved game-development productivity by carrying even small supporting features through to a complete, usable state.
