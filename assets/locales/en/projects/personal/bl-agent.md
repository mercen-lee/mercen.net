---
title: BL Agent
description: A desktop app that **extracts key data from B/L PDFs and saves it into an existing XLS template** for freight-forwarding work
logo_image: ../../images/projects/bl-agent.webp
period: 2026.06 ~
project_group: company
source_code: Private source · Disclosure is restricted by the client contract
vibe_coded: true
tech_stacks:
  - React
  - TypeScript
  - Tauri
  - Rust
  - SQLite
  - OpenAI API
---

# BL Agent

## Overview

BL Agent is a desktop application for freight-forwarding operations that **extracts key information from B/L PDF documents, supports human review, and saves the results into an existing `.xls` template**. A React interface and Tauri/Rust backend package document intake, extraction status, review, and XLS export into one operational tool.

Rather than building a simple OCR demonstration, I focused on **deliverable production quality**, including model configuration, extraction status, cancellation and restart behavior, and Windows installer packaging.

## My Role

- Rebranded the existing BL Reader product as BL Agent and aligned application metadata, release artifacts, documentation, and persisted storage keys.
- Designed the PDF-processing, field-review, result-storage, and XLS-export workflows.
- Directly resolved desktop distribution issues involving **Tauri v2 permissions, Windows NSIS installers, and macOS application bundles**.
- Wrote clear Korean operational copy and separated workflow states such as processing, review, and save so users could understand the tool immediately.

## Problems and Solutions

- Problem: When cancellation remains in a "request pending" state for too long, users lose confidence in an operational tool.
- Solution: Prioritized immediate cancellation feedback and **separated runtime state from persisted extraction history**, clearing the visible document queue on restart without deleting per-document records.

- Problem: Under Tauri v2, a native permission issue prevented the window's close button from terminating the application.
- Solution: Traced the behavior beyond the close handler into the capability manifest and added the `core:window:allow-destroy` permission.

- Problem: Details such as installer names, icons, Korean setup UI, and NSIS image warnings all affected the perceived quality of the Windows release.
- Solution: Refined the release workflow and Tauri bundle configuration so a single Windows installer and consistent branded assets were produced reliably.

## Quantified Results

- The application currently performs work equivalent to the workload previously handled by **six employees at the client company**.
- Verified macOS application bundles and Windows installer artifacts across the 1.0.x release line.
- Operated a validation workflow covering both the React/TypeScript frontend and Rust/Tauri backend.
- Resolved multiple release-blocking issues involving **SQLite identifier policy, extraction-state synchronization, window-close permissions, and NSIS packaging**.
