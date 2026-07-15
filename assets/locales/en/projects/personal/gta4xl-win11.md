---
title: Windows 11 for Galaxy Tab 6 Lite
description: A project to **install Windows 11 on ARM** on the Exynos 9611-based Galaxy Tab S6 Lite
logo_image: ../../images/projects/gta4xl-win11.webp
period: 2026.05 ~
source_code: Private source · The port is experimental and can be shared on request
vibe_coded: true
tech_stacks:
  - C
  - ARM64 Assembly
  - ACPI ASL
  - Python
  - WDK
  - ADB
---

# Windows 11 for Galaxy Tab 6 Lite

## Overview

Windows 11 for Galaxy Tab 6 Lite is a porting project intended to **run Windows 11 on ARM on an Exynos 9611-based Galaxy Tab S6 Lite**. It is a low-level systems project that analyzes the Android tablet's boot chain, ACPI tables, drivers, and device-tree-like hardware information, then reshapes them into forms Windows can recognize.

## My Role

- Analyzed the target device's hardware configuration and boot flow.
- Combined **ACPI ASL, ARM64 assembly, C, and Python tooling** to conduct the experiments required for a Windows on ARM port.
- Built a repeatable validation workflow using ADB and a custom recovery environment to test images and configuration changes.

## Problems and Solutions

- Problem: Booting Windows on an Android device requires firmware, ACPI, and driver layers that differ substantially from those of a conventional PC.
- Solution: Expressed hardware information through ACPI ASL and validated the minimum boot and device-initialization paths incrementally.

- Problem: A failed boot does not immediately reveal whether the fault lies in the kernel, ACPI, storage, display, or a driver.
- Solution: Used ADB, recovery, observable intermediate stages, and small image changes to create an **iterative debugging workflow that narrows the failure point**.

## Quantified Results

- Conducted low-level experiments to validate the feasibility of Windows 11 on ARM on the unconventional target of an **Exynos 9611-based ARM64 tablet**.
- Documented a porting workflow that combines C, ARM64 Assembly, ACPI ASL, Python, WDK, and ADB.
- The project remains in progress, prioritizing step-by-step validation of boot and device recognition over a completed feature set.
