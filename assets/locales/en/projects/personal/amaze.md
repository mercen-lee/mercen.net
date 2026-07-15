---
title: Amaze
description: A **multiplatform, AI-friendly game engine** implemented directly in Rust
logo_image: ../../images/projects/amaze.webp
period: 2026.05 ~
source_code: Private source · The engine is under development and can be shared on request
vibe_coded: true
tech_stacks:
  - Rust
  - Metal
  - Vulkan
  - DirectX 12
  - WebGPU
  - MCP
---

# Amaze

## Overview

Amaze is a **multiplatform game engine built in Rust**. Its documented scope includes in-house rendering and audio HALs, physics, networking, text shaping, ICU internationalization, OpenXR, an MCP server, and a shader compiler.

The goal is to support macOS, iOS, Windows, Linux, Android, and the web from a single source tree, while treating **MCP and SKILL bundles as first-class capabilities** so AI agents can work directly with the engine.

## My Role

- Defined the project's technical direction and workspace architecture.
- Separated engine, platform, backend, and foundation crates to create an **extensible structure for long-term development**.
- Clearly documented the intended scope of rendering, audio, physics, XR, networking, and MCP tooling, along with the distinction between implemented scaffolding and planned functionality.
- Designed a developer experience centered on documentation, examples, and skill bundles that AI agents can understand and use.

## Problems and Solutions

- Problem: An engine that avoids large subordinate runtimes such as `wgpu`, `winit`, Bevy, Rapier, and SDL can quickly lose clarity around its implementation boundaries.
- Solution: Split the engine core, platform runtimes, GPU and audio backends, and foundation features at the workspace level, while documenting planned and currently scaffolded capabilities separately.

- Problem: A modern game engine must be usable not only by human developers but also by AI agents.
- Solution: Included live MCP tooling, machine-readable documentation, and SKILL bundles in the product scope, defining **engine operation and documentation discovery as automatable workflows**.

## Quantified Results

- Defined a target platform matrix covering **six operating-system runtimes, five GPU backends, and five audio backends**.
- Designed a workspace containing **22 examples and a skill bundle for AI agents**.
- Decomposed major engine capabilities—including determinism, XR, world streaming, networking, and MCP tooling—into crates that can be implemented and maintained over the long term.
