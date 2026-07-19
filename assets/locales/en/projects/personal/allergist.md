---
title: Allergist
description: An iOS service that **checks food allergens** against each user's allergy profile
logo_image: ../../images/projects/allergist.webp
mockup_images:
  - ./allergist/allergist-1.webp
  - ./allergist/allergist-2.webp
  - ./allergist/allergist-3.webp
period: 2023.04
source_code: Source available · iOS app code is available on GitHub
award: Swift Student Challenge Winner, 2023
award_ref: ../../awards.json#/7
related_projects:
  - ./app-pilot.md
links:
  - label: Source Code
    url: https://github.com/Mercen-Lee/Allergist
  - label: Retrospective
    url: https://blog.mercen.net/24
tech_stacks:
  - Swift
  - SwiftUI
  - Swift Playgrounds
  - Property List
---

# Allergist

## Overview

Allergist is an iOS service that lets users **check food allergens against their personal allergy information**. It grew out of my own experience living with food allergies and was selected as a **[winner of the Apple WWDC Swift Student Challenge 2023](../../awards.json#/7)**.

To fit the U.S. competition context, I used U.S. allergen classifications and wrote every user-facing string in English.

## My Role

- Designed the service concept, data model, search experience, and settings interface, then implemented the complete product in SwiftUI.
- Built food-list exploration around each user's selected allergens so that **risky items could be identified immediately**.
- Bundled the food dataset inside the app so the experience would work in the offline Swift Playgrounds environment.
- Optimized the loading pipeline so the full dataset remained searchable within the competition's application size limit.

## Problems and Solutions

- Problem: The app had to process **558,728 food records** offline while remaining within a 25 MB size limit.
- Solution: Applied plist-based storage and data clustering, reducing **initial loading time from roughly one minute to about three seconds**.

- Problem: Allergy information must be interpreted in the context of a user's personal settings rather than as a generic keyword search.
- Solution: Separated food search from allergy configuration and highlighted each product's risks according to the active user profile.

## Quantified Results

- Processed **558,728 food records** entirely within the application.
- Reduced initial data loading from **approximately one minute to approximately three seconds**.
- Selected as a **[winner of the WWDC Swift Student Challenge 2023](../../awards.json#/7)**.
- Became the first project in a two-year run of Apple Swift Student Challenge wins that continued with [App Pilot](./app-pilot.md).
