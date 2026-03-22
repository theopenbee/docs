# OpenBee Documentation Site Design

## Overview

Comprehensive bilingual (English/Chinese) documentation for the OpenBee project, built on the existing Fumadocs site. Documentation is organized by audience into a User Guide (operators) and Developer Guide (contributors/extenders).

## I18n Strategy

**Directory parser**: Separate locale folders under `content/docs/`:
- `content/docs/en/` — English content
- `content/docs/cn/` — Chinese content

### source.config.ts Changes

```ts
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

export const docs = defineDocs({
  dir: [
    'content/docs/en',
    'content/docs/cn',
  ],
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {},
});
```

Note: Fumadocs resolves locale from directory structure when multiple dirs are provided. The `i18n` config in `source.ts` maps directory names to locale codes. If multi-dir does not work as expected with Fumadocs' `defineDocs`, fall back to the dot parser approach (e.g., `index.cn.mdx`) with a single `dir: 'content/docs'`. Test during implementation.

### source.ts

No changes needed — the existing loader already passes `i18n` config. The loader resolves locale from file paths automatically.

### layout.shared.tsx Changes

Update placeholder values:

```ts
export const gitConfig = {
  user: 'theopenbee',
  repo: 'openbee',
  branch: 'main',
};

// In baseOptions:
nav: {
  title: 'OpenBee',
},
```

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

## meta.json Files

### Top-level: `content/docs/en/meta.json`

```json
{
  "title": "OpenBee",
  "pages": ["index", "guide", "developer"]
}
```

### User Guide: `content/docs/en/guide/meta.json`

```json
{
  "title": "User Guide",
  "pages": [
    "index",
    "installation",
    "quick-start",
    "configuration",
    "platforms",
    "workers",
    "tasks",
    "memory",
    "web-console",
    "mcp-tools"
  ]
}
```

### Platforms: `content/docs/en/guide/platforms/meta.json`

```json
{
  "title": "Platforms",
  "pages": ["index", "feishu", "dingtalk", "wecom", "telegram"]
}
```

### Developer Guide: `content/docs/en/developer/meta.json`

```json
{
  "title": "Developer Guide",
  "pages": [
    "index",
    "architecture",
    "api-reference",
    "mcp-reference",
    "data-models",
    "contributing"
  ]
}
```

### Chinese meta.json files

Mirror the English structure with translated titles:

- Top-level: `"title": "OpenBee"`
- User Guide: `"title": "用户指南"`
- Platforms: `"title": "平台接入"`
- Developer Guide: `"title": "开发者指南"`

Page ordering remains the same.

## MDX Frontmatter

All pages use this frontmatter format:

```yaml
---
title: Page Title
description: One-line page description
---
```

The `title` and `description` fields are required (enforced by `pageSchema`). Optional fields: `icon` (Lucide icon name).

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

Replace `src/app/[lang]/(home)/page.tsx`. The component must accept `params` to extract `lang` for bilingual content.

Structure:
- Hero section: OpenBee tagline + brief description (translated per locale)
- Two CTA buttons: "Get Started" → `/${lang}/docs/guide`, "Developer Docs" → `/${lang}/docs/developer`
- Feature grid (4 items): Multi-IM Support, AI Workers, Task Scheduling, MCP Tools — each with icon + short description
- Use Tailwind CSS for styling, consistent with existing Fumadocs theme

Bilingual content handled via a simple translations object in the component (no need for a full i18n library for one page).

## Navigation

**Sidebar** (controlled by meta.json files above):
- Top level: Introduction, User Guide, Developer Guide
- User Guide: Installation → Quick Start → Configuration → Platforms (nested) → Workers → Tasks → Memory → Web Console → MCP Tools
- Developer Guide: Architecture → API Reference → MCP Reference → Data Models → Contributing

**Nav bar**: Site title "OpenBee", GitHub link (`https://github.com/theopenbee/openbee`), language switcher (English/中文)

## Locale Fallback Behavior

Fumadocs falls back to `defaultLanguage` (`en`) when a page does not exist in the requested locale. This means Chinese pages can be added incrementally — missing Chinese pages will show English content automatically.

## Search

The existing search API at `src/app/api/search/route.ts` uses `source` from `source.ts`, which already has i18n configured. No changes needed — Fumadocs indexes content per locale automatically.

## Existing Routes

- **OG image generation** (`/og/docs/[...slug]/`): No changes needed, works with slug-based resolution.
- **LLM text routes** (`/llms.txt`, `/llms-full.txt`, `/llms.mdx`): No changes needed, these read from the same source API.

## Implementation Phases

1. **Infrastructure**: Update `source.config.ts`, `layout.shared.tsx`, create directory structure, write all `meta.json` files, update home page
2. **Core User Guide (EN)**: Installation, Quick Start, Configuration, Workers, Tasks
3. **Platform Guides (EN)**: Platforms overview, Feishu, DingTalk, WeCom, Telegram
4. **Additional User Guide (EN)**: Memory, Web Console, MCP Tools
5. **Developer Guide (EN)**: Architecture, API Reference, MCP Reference, Data Models, Contributing
6. **Chinese Translation**: Translate all content from EN to CN, create CN meta.json files

## Content Principles

- **English first, Chinese follows**: Write English content first, then translate to Chinese
- **Practical examples**: Every configuration option and API endpoint includes working examples
- **Copy-pasteable**: Code blocks and config snippets should work as-is
- **Source of truth**: Content derived from actual OpenBee source code at `/Users/tengyongzhi/work/theopenbee/openbee`
