# OpenBee Documentation Site Design

## Overview

Comprehensive bilingual (English/Chinese) documentation for the OpenBee project, built on the existing Fumadocs site. Documentation is organized by audience into a User Guide (operators) and Developer Guide (contributors/extenders).

## I18n Strategy

**Directory parser**: Separate locale folders under `content/docs/`:
- `content/docs/en/` — English content
- `content/docs/cn/` — Chinese content

Requires updating `source.config.ts` to use directory-based content resolution. Existing `i18n.ts` and `layout.shared.tsx` configurations remain unchanged.

## Content Structure

```
content/docs/
├── en/
│   ├── index.mdx                     # Welcome / Introduction
│   ├── meta.json                     # Top-level nav ordering
│   ├── guide/
│   │   ├── meta.json
│   │   ├── index.mdx                 # User Guide overview
│   │   ├── installation.mdx
│   │   ├── quick-start.mdx
│   │   ├── configuration.mdx
│   │   ├── platforms/
│   │   │   ├── meta.json
│   │   │   ├── index.mdx             # Platforms overview
│   │   │   ├── feishu.mdx
│   │   │   ├── dingtalk.mdx
│   │   │   ├── wecom.mdx
│   │   │   └── telegram.mdx
│   │   ├── workers.mdx
│   │   ├── tasks.mdx
│   │   ├── memory.mdx
│   │   ├── web-console.mdx
│   │   └── mcp-tools.mdx
│   └── developer/
│       ├── meta.json
│       ├── index.mdx                 # Developer Guide overview
│       ├── architecture.mdx
│       ├── api-reference.mdx
│       ├── mcp-reference.mdx
│       ├── data-models.mdx
│       └── contributing.mdx
├── cn/
│   └── (mirrors en/ structure, Chinese content)
```

## Page Content Outline

### User Guide

| Page | Key Content |
|------|-------------|
| **Installation** | Prerequisites (Go 1.25+, Node.js 18+, Claude CLI), install via npm/go/binary, verify installation |
| **Quick Start** | Minimal config.yaml, start server, create first worker, send a message via local chat |
| **Configuration** | Full config.yaml reference — server, database, bee, claude, media, platform sections |
| **Platforms (overview)** | How platform adapters work, which to choose |
| **Feishu** | App creation, credentials, event subscription, config |
| **DingTalk** | Robot creation, streaming config, credentials |
| **WeCom** | Bot setup, WebSocket config |
| **Telegram** | BotFather setup, token config |
| **Workers** | Create/update/delete workers, CLAUDE.md customization, work directories |
| **Tasks** | Immediate/countdown/cron tasks, task lifecycle, cancellation |
| **Memory** | Global vs session-scoped memory, save/get/delete |
| **Web Console** | Dashboard, worker management, execution logs, session monitoring |
| **MCP Tools** | What MCP is, available tools overview, how workers use tools |

### Developer Guide

| Page | Key Content |
|------|-------------|
| **Architecture** | Component diagram, message flow (Platform → Ingestion → Bee → Dispatcher → Worker → Claude), concurrency model |
| **API Reference** | All REST endpoints — workers CRUD, executions, local chat, with request/response examples |
| **MCP Reference** | All MCP tools with parameters, return types, usage examples |
| **Data Models** | Worker, Task, Execution, Message, Session, Memory — fields and relationships |
| **Contributing** | Dev setup, build commands, project conventions, PR process |

## Home Page

Replace current placeholder with a proper landing page:
- OpenBee tagline and brief description
- "Get Started" button → User Guide
- "Developer Docs" button → Developer Guide
- Key feature highlights (multi-IM, AI workers, task scheduling, MCP tools)

## Navigation

**Sidebar** (via meta.json):
- Top level: Introduction, User Guide, Developer Guide
- User Guide: Installation → Quick Start → Configuration → Platforms (nested) → Workers → Tasks → Memory → Web Console → MCP Tools
- Developer Guide: Architecture → API Reference → MCP Reference → Data Models → Contributing

**Nav bar**: Site title "OpenBee", GitHub link, language switcher (English/中文)

## Configuration Changes

### source.config.ts

Update to support directory-based i18n content resolution, pointing to `content/docs/en` and `content/docs/cn` directories.

### source.ts

Update loader to work with directory-based content while maintaining existing i18n integration.

### Home page

Replace `src/app/[lang]/(home)/page.tsx` with landing page featuring project description and navigation CTAs.

## Content Principles

- **English first, Chinese follows**: Write English content first, then translate to Chinese
- **Practical examples**: Every configuration option and API endpoint includes working examples
- **Copy-pasteable**: Code blocks and config snippets should work as-is
- **Source of truth**: Content derived from actual OpenBee source code at `/Users/tengyongzhi/work/theopenbee/openbee`
