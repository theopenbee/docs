# OpenBee Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build comprehensive bilingual (EN/CN) documentation for OpenBee, organized into User Guide and Developer Guide sections.

**Architecture:** Fumadocs-based site with directory-parser i18n (`content/docs/en/`, `content/docs/cn/`). Content is MDX with YAML frontmatter. Navigation controlled by `meta.json` files. Home page is a custom React component with bilingual translations.

**Tech Stack:** Fumadocs (core + ui + mdx), Next.js 16, React 19, MDX, Tailwind CSS, TypeScript

**Source reference:** OpenBee project at `/Users/tengyongzhi/work/theopenbee/openbee`

**Note on MDX links:** `<Card>` href values use `/docs/...` paths without locale prefix (e.g., `href="/docs/guide/installation"`). Fumadocs' `createRelativeLink` and the `[lang]` route structure should auto-resolve the locale. Verify during Task 1 Step 8 that links work for both `/en/docs/...` and `/cn/docs/...`. If they don't, prefix all hrefs with the locale path.

---

## Task 1: Infrastructure — Config & Directory Setup

**Files:**
- Modify: `/Users/tengyongzhi/work/theopenbee/docs/source.config.ts`
- Modify: `/Users/tengyongzhi/work/theopenbee/docs/src/lib/layout.shared.tsx`
- Delete: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/index.mdx`
- Delete: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/test.mdx`
- Create: all `meta.json` files and directory structure

- [ ] **Step 1: Remove old placeholder content**

```bash
rm -f /Users/tengyongzhi/work/theopenbee/docs/content/docs/index.mdx
rm -f /Users/tengyongzhi/work/theopenbee/docs/content/docs/test.mdx
```

- [ ] **Step 2: Update `source.config.ts` for directory-based i18n**

Replace the contents of `/Users/tengyongzhi/work/theopenbee/docs/source.config.ts` with:

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

- [ ] **Step 3: Update `layout.shared.tsx` — fix placeholders**

In `/Users/tengyongzhi/work/theopenbee/docs/src/lib/layout.shared.tsx`, update:

```ts
export const gitConfig = {
  user: 'theopenbee',
  repo: 'openbee',
  branch: 'main',
};
```

And in `baseOptions`:

```ts
nav: {
  title: 'OpenBee',
},
```

- [ ] **Step 4: Create EN directory structure and meta.json files**

Create directories:
```bash
mkdir -p content/docs/en/guide/platforms
mkdir -p content/docs/en/developer
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/meta.json`:
```json
{
  "title": "OpenBee",
  "pages": ["index", "guide", "developer"]
}
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/meta.json`:
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

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/meta.json`:
```json
{
  "title": "Platforms",
  "pages": ["index", "feishu", "dingtalk", "wecom", "telegram"]
}
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/meta.json`:
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

- [ ] **Step 5: Create CN directory structure and meta.json files**

Create directories:
```bash
mkdir -p content/docs/cn/guide/platforms
mkdir -p content/docs/cn/developer
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/meta.json`:
```json
{
  "title": "OpenBee",
  "pages": ["index", "guide", "developer"]
}
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/guide/meta.json`:
```json
{
  "title": "用户指南",
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

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/guide/platforms/meta.json`:
```json
{
  "title": "平台接入",
  "pages": ["index", "feishu", "dingtalk", "wecom", "telegram"]
}
```

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/developer/meta.json`:
```json
{
  "title": "开发者指南",
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

- [ ] **Step 6: Create EN introduction page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/index.mdx`:

```mdx
---
title: Introduction
description: OpenBee — Run Claude as your digital employees
---

OpenBee is a digital employee solution that runs Claude AI as autonomous workers. Each worker is capable of multi-step task planning and independent execution, communicating through your existing IM platforms.

## Key Features

- **AI Workers** — Claude AI agents with persistent memory and MCP tool invocation
- **Multi-IM Support** — Lark (Feishu), DingTalk, WeCom, and Telegram
- **Task Scheduling** — Immediate, countdown, and cron-based recurring tasks
- **Web Console** — Manage workers, monitor tasks, and view execution logs
- **MCP Tools** — Extensible tool system for worker capabilities
- **Persistent Memory** — Workers remember context across sessions

## How It Works

```
IM Platforms (Feishu/DingTalk/WeCom/Telegram)
        ↓
Platform Integration Layer
        ↓
Message Ingestion & Task Scheduling
        ↓
Workers (Claude AI Agents)
        ↓
Web Console (Management & Monitoring)
```

Users send messages through their IM platform. OpenBee routes messages to the appropriate worker, which uses Claude AI to plan and execute tasks. Workers can invoke MCP tools, manage their own memory, and schedule follow-up tasks.

## Next Steps

<Cards>
  <Card title="Installation" href="/docs/guide/installation" />
  <Card title="Quick Start" href="/docs/guide/quick-start" />
  <Card title="Architecture" href="/docs/developer/architecture" />
</Cards>
```

- [ ] **Step 7: Create CN introduction page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/index.mdx`:

```mdx
---
title: 简介
description: OpenBee — 将 Claude 作为你的数字员工运行
---

OpenBee 是一个数字员工解决方案，将 Claude AI 作为自主工作者运行。每个工作者都能够进行多步骤任务规划和独立执行，通过你现有的即时通讯平台进行沟通。

## 核心特性

- **AI 工作者** — 具有持久记忆和 MCP 工具调用能力的 Claude AI 代理
- **多平台支持** — 飞书、钉钉、企业微信和 Telegram
- **任务调度** — 即时执行、倒计时和基于 cron 的定时任务
- **Web 控制台** — 管理工作者、监控任务、查看执行日志
- **MCP 工具** — 可扩展的工具系统，增强工作者能力
- **持久记忆** — 工作者跨会话记住上下文

## 工作原理

```
即时通讯平台（飞书/钉钉/企业微信/Telegram）
        ↓
平台集成层
        ↓
消息接收与任务调度
        ↓
工作者（Claude AI 代理）
        ↓
Web 控制台（管理与监控）
```

用户通过即时通讯平台发送消息。OpenBee 将消息路由到对应的工作者，工作者使用 Claude AI 来规划和执行任务。工作者可以调用 MCP 工具、管理自己的记忆，并安排后续任务。

## 下一步

<Cards>
  <Card title="安装" href="/docs/guide/installation" />
  <Card title="快速开始" href="/docs/guide/quick-start" />
  <Card title="架构概览" href="/docs/developer/architecture" />
</Cards>
```

**Note:** CN meta.json files reference pages that won't exist until Tasks 11-13. Fumadocs falls back to English for missing locale pages, so build warnings about missing CN content are expected and acceptable during Tasks 2-10.

- [ ] **Step 8: Verify the site builds**

```bash
cd /Users/tengyongzhi/work/theopenbee/docs && npm run build
```

Expected: Build succeeds. If the multi-dir `defineDocs` approach fails, apply the **fallback plan**:

**Fallback: Dot parser approach**

1. Revert `source.config.ts` to single dir:
```ts
export const docs = defineDocs({
  dir: 'content/docs',
  // ... rest unchanged
});
```

2. Move all EN files from `content/docs/en/` to `content/docs/` (remove the `en/` nesting)

3. Create CN files alongside EN files with `.cn` suffix:
   - `content/docs/index.cn.mdx` (instead of `content/docs/cn/index.mdx`)
   - `content/docs/guide/installation.cn.mdx` (instead of `content/docs/cn/guide/installation.mdx`)
   - Same pattern for all pages

4. CN meta.json files become `meta.cn.json` alongside the EN `meta.json`:
   - `content/docs/meta.cn.json`
   - `content/docs/guide/meta.cn.json`
   - etc.

5. Rebuild and verify.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: set up documentation infrastructure with i18n directory structure"
```

---

## Task 2: Home Page

**Files:**
- Modify: `/Users/tengyongzhi/work/theopenbee/docs/src/app/[lang]/(home)/page.tsx`

- [ ] **Step 1: Replace home page with bilingual landing page**

Replace `/Users/tengyongzhi/work/theopenbee/docs/src/app/[lang]/(home)/page.tsx` with:

```tsx
import Link from 'next/link';
import { MessageSquare, Bot, Clock, Wrench } from 'lucide-react';

const translations = {
  en: {
    tagline: 'Run Claude as Your Digital Employees',
    description:
      'OpenBee turns Claude AI into autonomous workers that communicate through Lark, DingTalk, WeCom, and Telegram. Multi-step task planning, persistent memory, and extensible MCP tools.',
    getStarted: 'Get Started',
    developerDocs: 'Developer Docs',
    features: [
      {
        icon: MessageSquare,
        title: 'Multi-IM Support',
        desc: 'Connect through Lark, DingTalk, WeCom, or Telegram',
      },
      {
        icon: Bot,
        title: 'AI Workers',
        desc: 'Claude agents with persistent memory and autonomous execution',
      },
      {
        icon: Clock,
        title: 'Task Scheduling',
        desc: 'Immediate, countdown, and cron-based recurring tasks',
      },
      {
        icon: Wrench,
        title: 'MCP Tools',
        desc: 'Extensible tool system for worker capabilities',
      },
    ],
  },
  cn: {
    tagline: '将 Claude 作为你的数字员工运行',
    description:
      'OpenBee 将 Claude AI 变为自主工作者，通过飞书、钉钉、企业微信和 Telegram 进行沟通。支持多步骤任务规划、持久记忆和可扩展的 MCP 工具。',
    getStarted: '快速开始',
    developerDocs: '开发者文档',
    features: [
      {
        icon: MessageSquare,
        title: '多平台支持',
        desc: '通过飞书、钉钉、企业微信或 Telegram 连接',
      },
      {
        icon: Bot,
        title: 'AI 工作者',
        desc: '具有持久记忆和自主执行能力的 Claude 代理',
      },
      {
        icon: Clock,
        title: '任务调度',
        desc: '支持即时执行、倒计时和基于 cron 的定时任务',
      },
      {
        icon: Wrench,
        title: 'MCP 工具',
        desc: '可扩展的工具系统，增强工作者能力',
      },
    ],
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] ?? translations.en;

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t.tagline}</h1>
        <p className="text-lg text-fd-muted-foreground mb-8">{t.description}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href={`/${lang}/docs/guide`}
            className="px-6 py-3 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            {t.getStarted}
          </Link>
          <Link
            href={`/${lang}/docs/developer`}
            className="px-6 py-3 rounded-lg border border-fd-border font-medium hover:bg-fd-accent transition-colors"
          >
            {t.developerDocs}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {t.features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-lg border border-fd-border"
          >
            <feature.icon className="w-8 h-8 mb-3 text-fd-primary" />
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-fd-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the site builds and home page renders**

```bash
cd /Users/tengyongzhi/work/theopenbee/docs && npm run build
```

Expected: Build succeeds. Manually verify by running `npm run dev` and checking `http://localhost:3000/en` and `http://localhost:3000/cn`.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[lang\]/\(home\)/page.tsx && git commit -m "feat: add bilingual landing page with feature highlights"
```

---

## Task 3: Core User Guide (EN) — Installation

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/index.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/installation.mdx`

- [ ] **Step 1: Create User Guide overview**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/index.mdx`:

```mdx
---
title: User Guide
description: Learn how to install, configure, and use OpenBee
---

This guide covers everything you need to get OpenBee running and manage your AI workers.

## Sections

<Cards>
  <Card title="Installation" href="/docs/guide/installation" />
  <Card title="Quick Start" href="/docs/guide/quick-start" />
  <Card title="Configuration" href="/docs/guide/configuration" />
  <Card title="Platforms" href="/docs/guide/platforms" />
  <Card title="Workers" href="/docs/guide/workers" />
  <Card title="Tasks" href="/docs/guide/tasks" />
  <Card title="Memory" href="/docs/guide/memory" />
  <Card title="Web Console" href="/docs/guide/web-console" />
  <Card title="MCP Tools" href="/docs/guide/mcp-tools" />
</Cards>
```

- [ ] **Step 2: Create Installation page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/installation.mdx`:

```mdx
---
title: Installation
description: Install OpenBee on your system
---

## Prerequisites

- **Claude CLI** — OpenBee requires Claude Code CLI to be installed. See [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code) for installation.
- **Go 1.25+** (only if building from source)
- **Node.js 18+** (only if building from source)
- **FFmpeg/FFprobe** (optional, for media file processing)

## Install via npm

```bash
npm install -g openbee
```

## Install via Script

**macOS / Linux:**

```bash
curl -fsSL https://raw.githubusercontent.com/theopenbee/openbee/main/install.sh | bash
```

**Windows (PowerShell):**

```powershell
irm https://raw.githubusercontent.com/theopenbee/openbee/main/install.ps1 | iex
```

## Install via Package Manager

**macOS (Homebrew):**

```bash
brew install theopenbee/tap/openbee
```

**Windows (Scoop):**

```bash
scoop bucket add theopenbee https://github.com/theopenbee/scoop-bucket.git
scoop install openbee
```

## Build from Source

```bash
git clone https://github.com/theopenbee/openbee.git
cd openbee
make web    # Build frontend assets
make build  # Build binary
```

The binary will be at `./bin/openbee`.

## Verify Installation

```bash
openbee --version
```

You should see the version number, commit hash, and build date.
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/en/guide/index.mdx content/docs/en/guide/installation.mdx && git commit -m "docs: add user guide overview and installation page"
```

---

## Task 4: Core User Guide (EN) — Quick Start & Configuration

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/quick-start.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/configuration.mdx`

- [ ] **Step 1: Create Quick Start page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/quick-start.mdx`:

```mdx
---
title: Quick Start
description: Get OpenBee running in minutes
---

## 1. Generate Configuration

Run the interactive configuration wizard:

```bash
openbee config
```

This walks you through setting up:
- Server host and port
- Database path
- Claude CLI path and timeout
- MCP API key (auto-generated or manual)
- Platform credentials (Feishu, DingTalk, WeCom, Telegram)

The configuration is saved to `config.yaml` by default. You can specify a different output path:

```bash
openbee config -o /path/to/config.yaml
```

## 2. Start the Server

```bash
openbee server
```

Or run as a background daemon:

```bash
openbee server -d
```

The web console is available at `http://localhost:8080` (or your configured host:port).

## 3. Create a Worker

Open the web console and create your first worker:

1. Navigate to the **Workers** page
2. Click **Create Worker**
3. Set a name (e.g., "Assistant") and description
4. Optionally add initial memory to define the worker's personality

Alternatively, use the local chat to interact immediately:

```bash
curl -X POST http://localhost:8080/api/local/sessions \
  -H "Content-Type: application/json" \
  -d '{"worker_id": "<worker-id>"}'
```

## 4. Send a Message

If you have a platform configured (e.g., Feishu), send a message to your bot in the IM app. OpenBee will route it to the appropriate worker.

For local testing, use the local chat API:

```bash
curl -X POST http://localhost:8080/api/local/sessions/<session-id>/messages \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello, what can you do?"}'
```

## Next Steps

- [Configuration Reference](/docs/guide/configuration) — Full config.yaml documentation
- [Platform Setup](/docs/guide/platforms) — Connect your IM platform
- [Workers](/docs/guide/workers) — Create and manage AI workers
```

- [ ] **Step 2: Create Configuration page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/configuration.mdx`:

```mdx
---
title: Configuration
description: Complete config.yaml reference
---

OpenBee uses a YAML configuration file. Generate one interactively with `openbee config`, or create it manually.

## Full Example

```yaml
server:
  port: 8080
  host: localhost
  debug: false

database:
  path: ./data/openbee.db

bee:
  claude:
    path: claude
    timeout: 45m
  mcp:
    api_key: "your-api-key"
  platforms:
    feishu:
      enabled: false
      app_id: ""
      app_secret: ""
      max_media_size: 104857600
    dingtalk:
      enabled: false
      client_id: ""
      client_secret: ""
    wecom:
      enabled: false
      bot_id: ""
      secret: ""
    telegram:
      enabled: false
      token: ""
      max_media_size: 52428800
  feeder:
    timeout: 10m
  media:
    ffprobe_path: ffprobe
    ffmpeg_path: ffmpeg
  message_debounce: 3s
```

## Server

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `server.port` | integer | `8080` | HTTP server port |
| `server.host` | string | `localhost` | Server bind address |
| `server.debug` | boolean | `false` | Enable debug mode (verbose logging) |

## Database

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database.path` | string | `./data/openbee.db` | SQLite database file path |

## Claude

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.claude.path` | string | `claude` | Path to Claude CLI binary |
| `bee.claude.timeout` | duration | `45m` | Maximum execution time per Claude invocation |

## MCP

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.mcp.api_key` | string | — | API key for MCP server authentication. Required for MCP tools to function. |

## Platforms

See [Platform Setup](/docs/guide/platforms) for detailed configuration of each platform.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.platforms.feishu.enabled` | boolean | `false` | Enable Feishu/Lark integration |
| `bee.platforms.feishu.app_id` | string | — | Feishu app ID |
| `bee.platforms.feishu.app_secret` | string | — | Feishu app secret |
| `bee.platforms.feishu.max_media_size` | integer | `104857600` | Max media file size (100MB) |
| `bee.platforms.dingtalk.enabled` | boolean | `false` | Enable DingTalk integration |
| `bee.platforms.dingtalk.client_id` | string | — | DingTalk client ID |
| `bee.platforms.dingtalk.client_secret` | string | — | DingTalk client secret |
| `bee.platforms.wecom.enabled` | boolean | `false` | Enable WeCom integration |
| `bee.platforms.wecom.bot_id` | string | — | WeCom bot ID |
| `bee.platforms.wecom.secret` | string | — | WeCom bot secret |
| `bee.platforms.telegram.enabled` | boolean | `false` | Enable Telegram integration |
| `bee.platforms.telegram.token` | string | — | Telegram bot token |
| `bee.platforms.telegram.max_media_size` | integer | `52428800` | Max media file size (50MB) |

## Feeder

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.feeder.timeout` | duration | `10m` | Bee (coordinator) feeding timeout |

## Media

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.media.ffprobe_path` | string | `ffprobe` | Path to FFprobe binary |
| `bee.media.ffmpeg_path` | string | `ffmpeg` | Path to FFmpeg binary |

## Message Processing

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bee.message_debounce` | duration | `3s` | Time window to aggregate multiple rapid messages into one |
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/en/guide/quick-start.mdx content/docs/en/guide/configuration.mdx && git commit -m "docs: add quick start and configuration reference"
```

---

## Task 5: Core User Guide (EN) — Workers & Tasks

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/workers.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/tasks.mdx`

- [ ] **Step 1: Create Workers page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/workers.mdx`:

```mdx
---
title: Workers
description: Create and manage AI workers
---

Workers are Claude AI agents that execute tasks. Each worker has its own identity, persistent memory, and working directory.

## Worker Properties

| Property | Description |
|----------|-------------|
| **Name** | Display name for the worker |
| **Description** | What the worker does — used for task routing |
| **Memory** | Persistent context written to the worker's CLAUDE.md file |
| **Work Directory** | Isolated filesystem path (`~/.openbee/worker/{id}`) |
| **Status** | `idle`, `working`, or `error` |

## Creating a Worker

### Via Web Console

1. Open the web console at `http://localhost:8080`
2. Go to **Workers** → **Create Worker**
3. Fill in the name, description, and optional memory

### Via API

```bash
curl -X POST http://localhost:8080/api/workers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Research Assistant",
    "description": "Helps with research tasks and summarization",
    "memory": "You are a research assistant. Be thorough and cite sources."
  }'
```

### Via MCP Tool

Workers can create other workers using the `create_worker` MCP tool:

```json
{
  "name": "create_worker",
  "arguments": {
    "name": "Research Assistant",
    "description": "Helps with research tasks",
    "memory": "You are a research assistant."
  }
}
```

## Managing Workers

### Update a Worker

```bash
curl -X PUT http://localhost:8080/api/workers/<worker-id> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "memory": "Updated memory content"
  }'
```

### Delete a Worker

```bash
curl -X DELETE http://localhost:8080/api/workers/<worker-id>
```

### List Workers

```bash
curl http://localhost:8080/api/workers
```

## CLAUDE.md Customization

Each worker has a `CLAUDE.md` file in its working directory that defines the worker's system prompt. This file is automatically managed by OpenBee based on the worker's memory field, but you can also edit it directly.

The working directory is located at `~/.openbee/worker/{worker-id}/`.

## Worker Status

| Status | Meaning |
|--------|---------|
| `idle` | Worker is available to accept tasks |
| `working` | Worker is currently executing a task |
| `error` | Worker encountered an error during execution |
```

- [ ] **Step 2: Create Tasks page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/tasks.mdx`:

```mdx
---
title: Tasks
description: Task types, scheduling, and lifecycle
---

Tasks are units of work assigned to workers. OpenBee supports three task types with different execution patterns.

## Task Types

### Immediate Tasks

Execute as soon as the worker is available. This is the default when a user sends a message.

### Countdown Tasks

Execute at a specific time. Useful for reminders and scheduled actions.

```json
{
  "name": "create_task",
  "arguments": {
    "worker_id": "<worker-id>",
    "instruction": "Send the weekly report",
    "type": "countdown",
    "scheduled_at": 1711180800000
  }
}
```

The `scheduled_at` field is a Unix timestamp in milliseconds.

### Scheduled (Cron) Tasks

Execute on a recurring schedule using cron expressions.

```json
{
  "name": "create_task",
  "arguments": {
    "worker_id": "<worker-id>",
    "instruction": "Check for new issues and summarize",
    "type": "scheduled",
    "cron_expr": "0 9 * * 1-5"
  }
}
```

This runs every weekday at 9:00 AM. Uses standard 5-field cron format: `minute hour day-of-month month day-of-week`.

## Task Lifecycle

```
pending → running → completed
                  → failed
pending → cancelled
```

| Status | Description |
|--------|-------------|
| `pending` | Task is queued, waiting to be picked up |
| `running` | Task is currently being executed by a worker |
| `completed` | Task finished successfully |
| `failed` | Task encountered an error |
| `cancelled` | Task was cancelled before execution |

## Managing Tasks

### List Tasks

Filter by session, worker, status, or type:

```json
{
  "name": "list_tasks",
  "arguments": {
    "worker_id": "<worker-id>",
    "status": "pending"
  }
}
```

### Cancel a Task

Cancel a pending or scheduled task:

```json
{
  "name": "cancel_task",
  "arguments": {
    "task_id": "<task-id>"
  }
}
```

### Mark a Task Complete

```json
{
  "name": "mark_task_complete",
  "arguments": {
    "task_id": "<task-id>"
  }
}
```

## Task Dispatcher

The task dispatcher coordinates worker execution queues. It ensures:
- One task runs per worker at a time
- Tasks are processed in order
- Failed tasks are tracked with execution logs
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/en/guide/workers.mdx content/docs/en/guide/tasks.mdx && git commit -m "docs: add workers and tasks documentation"
```

---

## Task 6: Platform Guides (EN)

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/index.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/feishu.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/dingtalk.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/wecom.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/telegram.mdx`

- [ ] **Step 1: Create Platforms overview**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/index.mdx`:

```mdx
---
title: Platforms
description: Connect OpenBee to your IM platform
---

OpenBee communicates through instant messaging platforms. Each platform has its own adapter that handles message receiving and sending.

## Supported Platforms

| Platform | Protocol | Key Feature |
|----------|----------|-------------|
| [Feishu (Lark)](/docs/guide/platforms/feishu) | HTTP webhook + SDK | Full-featured, supports rich messages and media |
| [DingTalk](/docs/guide/platforms/dingtalk) | Streaming SDK | Real-time streaming connection |
| [WeCom](/docs/guide/platforms/wecom) | WebSocket | Persistent WebSocket connection with auto-reconnect |
| [Telegram](/docs/guide/platforms/telegram) | Bot API (polling) | Simple setup, global availability |

## How It Works

1. A user sends a message in the IM platform
2. The platform adapter receives the message
3. OpenBee's message ingestion gateway debounces rapid messages (configurable, default 3s)
4. The bee (coordinator) routes the message to the appropriate worker
5. The worker executes the task and sends a reply through the same platform

## Choosing a Platform

- **Feishu** — Best for teams already using Lark/Feishu. Rich media support.
- **DingTalk** — Best for teams using DingTalk. Streaming connection means no webhook setup.
- **WeCom** — Best for teams using WeChat Work. WebSocket-based, no public URL needed.
- **Telegram** — Best for personal use or global teams. Easiest to set up.

You can enable multiple platforms simultaneously.
```

- [ ] **Step 2: Create Feishu page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/feishu.mdx`:

```mdx
---
title: Feishu (Lark)
description: Set up Feishu/Lark integration
---

## Create a Feishu App

1. Go to [Feishu Open Platform](https://open.feishu.cn/)
2. Create a new custom app
3. Note the **App ID** and **App Secret** from the app credentials page

## Configure Permissions

Add the following permissions to your app:
- `im:message` — Send and receive messages
- `im:message.group_at_msg` — Receive @mentions in groups
- `im:resource` — Access media resources

## Set Up Event Subscription

1. In your app settings, go to **Event Subscriptions**
2. Configure the request URL to point to your OpenBee server
3. Subscribe to the `im.message.receive_v1` event

## Configure OpenBee

Add to your `config.yaml`:

```yaml
bee:
  platforms:
    feishu:
      enabled: true
      app_id: "your-app-id"
      app_secret: "your-app-secret"
      max_media_size: 104857600  # 100MB, optional
```

## Publish the App

1. Submit your app for review in the Feishu Open Platform
2. Once approved, users can find and message your bot

## Media Support

Feishu supports sending and receiving media files (images, documents, audio, video) up to the configured `max_media_size` (default 100MB). OpenBee uses FFprobe/FFmpeg for media processing when available.
```

- [ ] **Step 3: Create DingTalk page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/dingtalk.mdx`:

```mdx
---
title: DingTalk
description: Set up DingTalk integration
---

## Create a DingTalk Robot

1. Go to [DingTalk Open Platform](https://open-dev.dingtalk.com/)
2. Create a new application
3. Add a robot capability to your application
4. Note the **Client ID** and **Client Secret**

## Configure Streaming

DingTalk uses a streaming SDK connection — no public webhook URL is needed. The SDK maintains a persistent connection to DingTalk's servers.

## Configure OpenBee

Add to your `config.yaml`:

```yaml
bee:
  platforms:
    dingtalk:
      enabled: true
      client_id: "your-client-id"
      client_secret: "your-client-secret"
```

## Deploy

Once configured, restart OpenBee. The DingTalk streaming connection will be established automatically. Users can find and message your bot in DingTalk.
```

- [ ] **Step 4: Create WeCom page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/wecom.mdx`:

```mdx
---
title: WeCom
description: Set up WeCom (WeChat Work) integration
---

## Create a WeCom Bot

1. Go to [WeCom Admin Console](https://work.weixin.qq.com/)
2. Create a new application or bot
3. Note the **Bot ID** and **Secret**

## WebSocket Connection

WeCom uses a WebSocket connection for real-time message delivery. OpenBee automatically handles:
- Connection establishment
- Heartbeat keep-alive
- Automatic reconnection on disconnect

No public URL or webhook setup is required.

## Configure OpenBee

Add to your `config.yaml`:

```yaml
bee:
  platforms:
    wecom:
      enabled: true
      bot_id: "your-bot-id"
      secret: "your-secret"
```

## Deploy

Restart OpenBee after configuration. The WebSocket connection to WeCom will be established automatically.
```

- [ ] **Step 5: Create Telegram page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/platforms/telegram.mdx`:

```mdx
---
title: Telegram
description: Set up Telegram bot integration
---

## Create a Telegram Bot

1. Open Telegram and message [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Note the **bot token** provided by BotFather

## Configure OpenBee

Add to your `config.yaml`:

```yaml
bee:
  platforms:
    telegram:
      enabled: true
      token: "your-bot-token"
      max_media_size: 52428800  # 50MB, optional
```

## Deploy

Restart OpenBee. The Telegram bot will start polling for messages automatically. Users can find your bot by its username and start chatting.

## Media Support

Telegram supports media files up to the configured `max_media_size` (default 50MB). This is limited by Telegram's Bot API file size restrictions.
```

- [ ] **Step 6: Commit**

```bash
git add content/docs/en/guide/platforms/ && git commit -m "docs: add platform setup guides (Feishu, DingTalk, WeCom, Telegram)"
```

---

## Task 7: Additional User Guide (EN) — Memory, Web Console, MCP Tools

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/memory.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/web-console.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/mcp-tools.mdx`

- [ ] **Step 1: Create Memory page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/memory.mdx`:

```mdx
---
title: Memory
description: Persistent memory system for workers
---

OpenBee provides a key-value memory system that persists across sessions. Workers can save, retrieve, and delete memory entries to maintain context over time.

## Memory Scopes

| Scope | Description |
|-------|-------------|
| **Global** | Shared across all sessions. Managed by the bee coordinator. |
| **Session** | Scoped to a specific user session. Private to that conversation. |

## Using Memory

### Save Memory

```json
{
  "name": "save_memory",
  "arguments": {
    "scope": "global",
    "key": "user_preference",
    "value": "Prefers concise responses"
  }
}
```

### Retrieve Memory

Get a single entry:

```json
{
  "name": "get_memory",
  "arguments": {
    "scope": "global",
    "key": "user_preference"
  }
}
```

Get all entries in a scope:

```json
{
  "name": "get_memory",
  "arguments": {
    "scope": "global"
  }
}
```

### Delete Memory

```json
{
  "name": "delete_memory",
  "arguments": {
    "scope": "global",
    "key": "user_preference"
  }
}
```

## How Workers Use Memory

Workers automatically use memory through MCP tools. The bee coordinator can save global memory for cross-session context, while workers save session-scoped memory for user-specific preferences.

Memory entries are stored in the SQLite database (`bee_memory` table) and persist across server restarts.
```

- [ ] **Step 2: Create Web Console page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/web-console.mdx`:

```mdx
---
title: Web Console
description: Manage OpenBee through the web interface
---

The web console provides a graphical interface for managing workers, monitoring tasks, and viewing execution logs.

## Accessing the Console

Open your browser to `http://localhost:8080` (or your configured host:port). The console is automatically served alongside the API.

## Dashboard

The overview page shows:
- Total workers and their status distribution
- Recent executions
- System statistics

## Worker Management

- **Create workers** with name, description, and initial memory
- **Edit workers** to update their configuration
- **Delete workers** and optionally remove their working directories
- **View worker details** including status and execution history

## Execution Logs

- View all executions across workers
- Filter by worker or session
- **Real-time log streaming** — watch execution output as it happens
- View execution results and status

## Session Monitoring

- Track active sessions across platforms
- View which workers have active contexts in each session
- Clear session contexts when needed
```

- [ ] **Step 3: Create MCP Tools page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/guide/mcp-tools.mdx`:

```mdx
---
title: MCP Tools
description: How workers use MCP tools
---

OpenBee uses the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) to give workers access to tools. Workers invoke tools through a local MCP server that OpenBee runs alongside the API.

## What Is MCP?

MCP is an open protocol that standardizes how AI models interact with tools and data sources. In OpenBee, the MCP server exposes tools for worker management, task scheduling, messaging, and memory.

## Available Tool Categories

### Worker Management
- `list_workers` — List all workers
- `get_worker` — Get worker details
- `create_worker` — Create a new worker
- `update_worker` — Update worker properties
- `delete_worker` — Delete a worker

### Task Management
- `create_task` — Create immediate, countdown, or scheduled tasks
- `list_tasks` — Query tasks with filters
- `cancel_task` — Cancel a pending task
- `mark_task_complete` — Mark a task as done

### Messaging
- `send_message` — Reply to the user (supports text and media)

### Session Management
- `clear_session` — Clear all tasks and contexts in a session
- `list_session_contexts` — List active worker contexts
- `clear_worker_session` — Reset a specific worker's context

### Memory
- `save_memory` — Store a key-value pair
- `get_memory` — Retrieve memory entries
- `delete_memory` — Remove a memory entry

### Monitoring
- `get_worker_status` — Check worker status and task count
- `get_system_overview` — System-wide statistics
- `list_bee_executions` — View bee coordinator execution history

## MCP Server Connection

The MCP server runs at `/mcp/sse` using Server-Sent Events (SSE) transport. It requires the `bee.mcp.api_key` from your configuration for authentication.

See the [MCP Reference](/docs/developer/mcp-reference) for detailed tool parameters and return types.
```

- [ ] **Step 4: Commit**

```bash
git add content/docs/en/guide/memory.mdx content/docs/en/guide/web-console.mdx content/docs/en/guide/mcp-tools.mdx && git commit -m "docs: add memory, web console, and MCP tools guides"
```

---

## Task 8: Developer Guide (EN) — Architecture & Data Models

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/index.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/architecture.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/data-models.mdx`

- [ ] **Step 1: Create Developer Guide overview**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/index.mdx`:

```mdx
---
title: Developer Guide
description: Understand OpenBee's internals and contribute
---

This guide covers OpenBee's architecture, APIs, data models, and how to contribute.

<Cards>
  <Card title="Architecture" href="/docs/developer/architecture" />
  <Card title="API Reference" href="/docs/developer/api-reference" />
  <Card title="MCP Reference" href="/docs/developer/mcp-reference" />
  <Card title="Data Models" href="/docs/developer/data-models" />
  <Card title="Contributing" href="/docs/developer/contributing" />
</Cards>
```

- [ ] **Step 2: Create Architecture page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/architecture.mdx`:

```mdx
---
title: Architecture
description: OpenBee's internal architecture and message flow
---

## Overview

OpenBee is built as a modular Go application with a React frontend. The backend handles message routing, task scheduling, worker management, and Claude AI integration.

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                  IM Platforms                     │
│  ┌────────┐ ┌────────┐ ┌───────┐ ┌──────────┐  │
│  │ Feishu │ │DingTalk│ │ WeCom │ │ Telegram │  │
│  └───┬────┘ └───┬────┘ └──┬────┘ └────┬─────┘  │
└──────┼──────────┼─────────┼───────────┼─────────┘
       └──────────┼─────────┼───────────┘
                  ▼         ▼
       ┌──────────────────────────┐
       │  Platform Adapters       │
       │  (Receiver + Sender)     │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │  Message Ingestion       │
       │  (Debounce + Gateway)    │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │  Bee (Coordinator)       │
       │  (Feeder + Claude AI)    │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │  Task Dispatcher         │
       │  + Task Scheduler        │
       └────────────┬─────────────┘
                    ▼
       ┌──────────────────────────┐
       │  Workers                 │
       │  (Claude AI Agents)      │
       └──────────────────────────┘
```

## Message Flow

1. **Platform Receiver** — Each platform adapter listens for incoming messages via its protocol (webhook, streaming, WebSocket, or polling)
2. **Message Ingestion** — The gateway debounces rapid messages (default 3s window) and stores them in the database
3. **Bee Feeder** — Polls for unprocessed messages every 5 seconds, groups by session key, and invokes the bee (Claude AI coordinator)
4. **Bee Coordinator** — A Claude AI process that reads the message and decides which worker should handle it, creates tasks accordingly
5. **Task Dispatcher** — Picks up pending tasks and routes them to the assigned worker
6. **Worker Execution** — Spawns a Claude CLI subprocess with the worker's CLAUDE.md and working directory. The worker uses MCP tools to interact with the system.
7. **Response** — The worker calls `send_message` via MCP, which routes the reply back through the platform adapter

## Key Components

### Platform Adapters (`internal/platform/`)

Each platform implements the `Receiver` and `Sender` interfaces:
- **Receiver**: Listens for incoming messages from the platform
- **Sender**: Sends replies back to the platform

### Message Ingestion (`internal/msgingest/`)

The `Gateway` aggregates rapid messages within a configurable debounce window before forwarding to the bee.

### Bee (`internal/bee/`)

The `Feeder` is the core component:
- Polls the `platform_messages` table for unprocessed messages
- Groups messages by session key
- Invokes Claude AI as the bee coordinator
- Manages session continuity (resume existing sessions)
- Handles failure recovery and retries

### Claude Integration (`internal/claude/`)

The `Invoker` spawns Claude CLI as subprocesses:
- Passes working directory with CLAUDE.md for system prompt
- Communicates via stdout/stderr streams
- Supports session resumption via `--resume` flag
- Connects to the MCP server for tool invocation

### Task System (`internal/task_dispatcher/`, `internal/task_scheduler/`)

- **Dispatcher**: Manages per-worker execution queues, ensures one task per worker at a time
- **Scheduler**: Polls for countdown and cron tasks, triggers them at the right time

### Data Layer (`internal/store/`)

SQLite-based persistence with tables prefixed `bee_`:
- `bee_workers`, `bee_tasks`, `bee_executions`, `bee_messages`, `bee_sessions`, `bee_memory`

### MCP Server (`internal/mcp/`)

Exposes 19 tools via SSE transport at `/mcp/sse`. Authenticated with API key. Used by both bee and workers during Claude CLI execution.

## Concurrency Model

- The bee feeder and task scheduler run as independent goroutines
- Each platform receiver runs in its own goroutine
- Worker executions are isolated processes (Claude CLI subprocesses)
- `golang.org/x/sync` is used for structured concurrency
- Graceful shutdown with 15-second timeout on SIGINT/SIGTERM
```

- [ ] **Step 3: Create Data Models page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/data-models.mdx`:

```mdx
---
title: Data Models
description: Core data structures in OpenBee
---

## Worker

Represents an AI agent that executes tasks.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | UUID, auto-generated |
| `name` | string | Display name |
| `description` | string | Purpose and capabilities |
| `memory` | string | Persistent context (written to CLAUDE.md) |
| `work_dir` | string | Filesystem path (`~/.openbee/worker/{id}`) |
| `status` | string | `idle`, `working`, or `error` |
| `created_at` | int64 | Unix timestamp in milliseconds |
| `updated_at` | int64 | Unix timestamp in milliseconds |

## Task

A unit of work assigned to a worker.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | UUID, auto-generated |
| `message_id` | string | Reference to the originating platform message |
| `worker_id` | string | Assigned worker |
| `instruction` | string | What the worker should do |
| `type` | string | `immediate`, `countdown`, or `scheduled` |
| `status` | string | `pending`, `running`, `completed`, `failed`, or `cancelled` |
| `scheduled_at` | int64? | Unix ms — trigger time for countdown tasks |
| `cron_expr` | string | 5-field cron expression for scheduled tasks |
| `next_run_at` | int64? | Unix ms — next trigger time for scheduled tasks |
| `execution_id` | string | Associated execution record |
| `created_at` | int64 | Unix timestamp in milliseconds |
| `updated_at` | int64 | Unix timestamp in milliseconds |

## Execution

A record of a worker running a task.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | UUID, auto-generated |
| `worker_id` | string? | Worker that ran this (null for bee executions) |
| `session_id` | string | Claude session ID (for resumption) |
| `trigger_input` | string | The original instruction/prompt |
| `status` | string | `pending`, `running`, `completed`, or `failed` |
| `result` | string | Execution output |
| `log_path` | string | Filesystem path to execution logs |
| `ai_process_pid` | int | PID of the Claude CLI process |
| `started_at` | int64? | Unix timestamp in milliseconds |
| `completed_at` | int64? | Unix timestamp in milliseconds |

## Database Schema

All tables use the `bee_` prefix and are stored in SQLite:

- `bee_workers` — Worker definitions
- `bee_tasks` — Task records
- `bee_executions` — Execution history
- `bee_messages` — Platform messages
- `bee_sessions` — Session tracking
- `bee_memory` — Key-value memory store
- `bee_migrations` — Schema migration tracking

Database path is configurable (default: `~/.openbee/openbee.db` or `./data/openbee.db`).
```

- [ ] **Step 4: Commit**

```bash
git add content/docs/en/developer/ && git commit -m "docs: add developer guide overview, architecture, and data models"
```

---

## Task 9: Developer Guide (EN) — API Reference

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/api-reference.mdx`

- [ ] **Step 1: Create API Reference page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/api-reference.mdx`:

```mdx
---
title: API Reference
description: OpenBee REST API endpoints
---

All endpoints are served from `http://{host}:{port}/api/`.

## Workers

### Create Worker

`POST /api/workers`

```json
{
  "name": "Assistant",
  "description": "General purpose assistant",
  "memory": "You are a helpful assistant."
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "name": "Assistant",
  "description": "General purpose assistant",
  "memory": "You are a helpful assistant.",
  "work_dir": "/home/user/.openbee/worker/uuid",
  "status": "idle",
  "created_at": 1711180800000,
  "updated_at": 1711180800000
}
```

### List Workers

`GET /api/workers`

**Response:** `200 OK` — Array of worker objects.

### Get Worker

`GET /api/workers/:id`

**Response:** `200 OK` — Single worker object.

### Update Worker

`PUT /api/workers/:id`

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "memory": "Updated memory"
}
```

All fields are optional (patch semantics).

**Response:** `200 OK` — Updated worker object.

### Delete Worker

`DELETE /api/workers/:id`

**Response:** `200 OK`

## Executions

### List All Executions

`GET /api/executions`

**Response:** `200 OK` — Array of execution objects.

### Get Execution

`GET /api/executions/:id`

**Response:** `200 OK` — Single execution object.

### Stream Execution Logs

`GET /api/executions/:id/logs`

**Response:** Server-Sent Events (SSE) stream of log lines. For completed executions, returns the full log file content.

### List Worker Executions

`GET /api/workers/:id/executions`

**Response:** `200 OK` — Array of execution objects for the specified worker.

### List Session Executions

`GET /api/sessions/:sessionId/executions`

**Response:** `200 OK` — Array of execution objects for the specified session.

## Local Chat

### Start Session

`POST /api/local/sessions`

```json
{
  "worker_id": "uuid"
}
```

**Response:** `201 Created`

```json
{
  "id": "session-uuid"
}
```

### Send Message

`POST /api/local/sessions/:id/messages`

```json
{
  "content": "Hello, what can you do?"
}
```

**Response:** `200 OK`

### Stream Replies

`GET /api/local/sessions/:id/stream`

**Response:** Server-Sent Events (SSE) stream of worker replies.

## Internal

### Set Log Level

`PUT /internal/log/level`

```json
{
  "level": "debug"
}
```

Valid levels: `debug`, `info`, `warn`, `error`.

**Response:** `200 OK`
```

- [ ] **Step 2: Commit**

```bash
git add content/docs/en/developer/api-reference.mdx && git commit -m "docs: add REST API reference"
```

---

## Task 10: Developer Guide (EN) — MCP Reference & Contributing

**Files:**
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/mcp-reference.mdx`
- Create: `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/contributing.mdx`

- [ ] **Step 1: Create MCP Reference page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/mcp-reference.mdx`:

```mdx
---
title: MCP Reference
description: Complete MCP tool reference with parameters and return types
---

The MCP server runs at `/mcp/sse` using Server-Sent Events transport. All requests require the `bee.mcp.api_key` for authentication.

## Worker Management

### list_workers

List all registered workers.

**Parameters:** None

**Returns:** Array of worker objects with `id`, `name`, `description`, `memory`, `work_dir`, `status`, `created_at`, `updated_at`.

### get_worker

Get a single worker by ID.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `worker_id` | string | Yes | Worker UUID |

### create_worker

Create a new worker.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Worker display name |
| `description` | string | No | Worker purpose |
| `memory` | string | No | Initial persistent memory |
| `work_dir` | string | No | Custom working directory |

### update_worker

Update worker properties (patch semantics).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `worker_id` | string | Yes | Worker UUID |
| `name` | string | No | New name |
| `description` | string | No | New description |
| `memory` | string | No | New memory content |

### delete_worker

Delete a worker.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `worker_id` | string | Yes | Worker UUID |
| `delete_work_dir` | boolean | No | Also delete working directory |

## Task Management

### create_task

Create a task for a worker.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message_id` | string | Yes | Originating message ID |
| `worker_id` | string | Yes | Target worker UUID |
| `instruction` | string | Yes | Task instruction |
| `type` | string | No | `immediate` (default), `countdown`, or `scheduled` |
| `scheduled_at` | int64 | Conditional | Unix ms, required for `countdown` type |
| `cron_expr` | string | Conditional | 5-field cron, required for `scheduled` type |

### list_tasks

Query tasks with filters.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message_id` | string | No | Filter by message |
| `session_key` | string | No | Filter by session |
| `worker_id` | string | No | Filter by worker |
| `status` | string | No | Filter by status |
| `type` | string | No | Filter by type |

### cancel_task

Cancel a pending or scheduled task.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task_id` | string | Yes | Task UUID |

### mark_task_complete

Mark a task as completed.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task_id` | string | Yes | Task UUID |

## Messaging

### send_message

Send a reply to the user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message_id` | string | Yes | Original message to reply to |
| `content` | string | Yes | Reply text content |
| `media_path` | string | No | Path to media file to attach |

## Session Management

### clear_session

Clear all tasks and reset session contexts.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_key` | string | Yes | Session identifier |
| `force` | boolean | No | Force clear even if tasks are running |

### list_session_contexts

List workers with active contexts in a session.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_key` | string | Yes | Session identifier |

### clear_worker_session

Reset a specific worker's Claude session context.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `session_key` | string | Yes | Session identifier |
| `worker_id` | string | Yes | Worker UUID |

## Memory

### save_memory

Save or update a memory entry.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | `global` or session key |
| `key` | string | Yes | Memory key |
| `value` | string | Yes | Memory value |

### get_memory

Retrieve memory entries.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | `global` or session key |
| `key` | string | No | Specific key (omit for all entries in scope) |

### delete_memory

Delete a memory entry.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scope` | string | Yes | `global` or session key |
| `key` | string | Yes | Memory key |

## Monitoring

### get_worker_status

View worker status and pending task count.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `worker_id` | string | Yes | Worker UUID |

### get_system_overview

Get system-wide statistics. No parameters.

**Returns:** Worker count by status, total tasks by status, recent executions.

### list_bee_executions

View bee coordinator execution history.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | int | No | Max results (default 10) |
```

- [ ] **Step 2: Create Contributing page**

Create `/Users/tengyongzhi/work/theopenbee/docs/content/docs/en/developer/contributing.mdx`:

```mdx
---
title: Contributing
description: How to contribute to OpenBee
---

## Prerequisites

- Go 1.25+
- Node.js 18+
- pnpm
- Git

## Development Setup

```bash
git clone https://github.com/theopenbee/openbee.git
cd openbee
make web      # Build frontend assets
make build    # Build binary
```

## Running Locally

```bash
# Generate config
./bin/openbee config

# Start server
./bin/openbee server
```

## Running Tests

```bash
go test ./...
```

## Project Structure

```
cmd/openbee/        CLI entry point (main, server, config commands)
internal/
  api/              HTTP API handlers (Gin router)
  app/              Application lifecycle and component wiring
  bee/              Core bot logic (Feeder, message routing)
  claude/           Claude CLI integration (process management)
  claudemd/         CLAUDE.md file management
  config/           YAML configuration loading
  mcp/              MCP server (tools, SSE transport)
  msgingest/        Message ingestion and debouncing
  model/            Data structures (Worker, Task, Execution)
  platform/         Platform adapters (Feishu, DingTalk, WeCom, Telegram)
  store/            SQLite data persistence
  task_dispatcher/  Task execution coordination
  task_scheduler/   Cron-based task scheduling
  worker/           Worker lifecycle management
  logger/           Structured logging (zap)
  media/            Media handling (FFmpeg/FFprobe)
web/                React + TypeScript frontend (Vite, Tailwind)
```

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `test` | Tests |
| `refactor` | Code restructuring |
| `chore` | Build, dependencies |
| `ci` | CI/CD changes |

Example: `feat: add webhook support for WeCom platform`

## Pull Request Process

1. Fork the repository
2. Create a branch from `main`
3. Make focused, well-tested changes
4. Submit a PR with a clear description
5. Address review feedback
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/en/developer/mcp-reference.mdx content/docs/en/developer/contributing.mdx && git commit -m "docs: add MCP reference and contributing guide"
```

---

## Task 11: Chinese Translation — Introduction & User Guide

**Files:**
- Create: all files under `/Users/tengyongzhi/work/theopenbee/docs/content/docs/cn/`

- [ ] **Step 1: Create CN User Guide overview and core pages**

Translate the following EN files to Chinese, maintaining the same MDX structure and frontmatter format. Create the CN versions at the corresponding paths under `content/docs/cn/`:

- `cn/guide/index.mdx` — User Guide overview (title: "用户指南")
- `cn/guide/installation.mdx` — Installation (title: "安装")
- `cn/guide/quick-start.mdx` — Quick Start (title: "快速开始")
- `cn/guide/configuration.mdx` — Configuration (title: "配置参考")
- `cn/guide/workers.mdx` — Workers (title: "工作者")
- `cn/guide/tasks.mdx` — Tasks (title: "任务")

Translation guidelines:
- Translate all prose text to natural Chinese
- Keep code blocks, YAML, JSON, and CLI commands in English
- Keep technical terms like "MCP", "Claude", "API", "UUID", "cron" untranslated
- Translate table headers and descriptions
- Keep the same link paths (they work across locales)

- [ ] **Step 2: Commit**

```bash
git add content/docs/cn/ && git commit -m "docs: add Chinese translations for introduction and core user guide"
```

---

## Task 12: Chinese Translation — Platform Guides & Additional Pages

**Files:**
- Create: remaining CN files

- [ ] **Step 1: Translate platform guides**

Create CN versions of:
- `cn/guide/platforms/index.mdx` — Platforms overview (title: "平台接入")
- `cn/guide/platforms/feishu.mdx` — Feishu (title: "飞书")
- `cn/guide/platforms/dingtalk.mdx` — DingTalk (title: "钉钉")
- `cn/guide/platforms/wecom.mdx` — WeCom (title: "企业微信")
- `cn/guide/platforms/telegram.mdx` — Telegram (title: "Telegram")

- [ ] **Step 2: Translate additional user guide pages**

- `cn/guide/memory.mdx` — Memory (title: "记忆系统")
- `cn/guide/web-console.mdx` — Web Console (title: "Web 控制台")
- `cn/guide/mcp-tools.mdx` — MCP Tools (title: "MCP 工具")

- [ ] **Step 3: Commit**

```bash
git add content/docs/cn/guide/ && git commit -m "docs: add Chinese translations for platform guides and additional pages"
```

---

## Task 13: Chinese Translation — Developer Guide

**Files:**
- Create: CN developer guide files

- [ ] **Step 1: Translate developer guide pages**

Create CN versions of:
- `cn/developer/index.mdx` — Developer Guide overview (title: "开发者指南")
- `cn/developer/architecture.mdx` — Architecture (title: "架构概览")
- `cn/developer/api-reference.mdx` — API Reference (title: "API 参考")
- `cn/developer/mcp-reference.mdx` — MCP Reference (title: "MCP 参考")
- `cn/developer/data-models.mdx` — Data Models (title: "数据模型")
- `cn/developer/contributing.mdx` — Contributing (title: "贡献指南")

Translation guidelines (same as Task 11):
- Translate prose, keep code/config in English
- Keep technical terms untranslated

- [ ] **Step 2: Commit**

```bash
git add content/docs/cn/developer/ && git commit -m "docs: add Chinese translations for developer guide"
```

---

## Task 14: Final Build Verification

- [ ] **Step 1: Run full build**

```bash
cd /Users/tengyongzhi/work/theopenbee/docs && npm run build
```

Expected: Build succeeds with no errors. All pages should be generated for both `en` and `cn` locales.

- [ ] **Step 2: Spot-check pages**

```bash
cd /Users/tengyongzhi/work/theopenbee/docs && npm run dev
```

Verify manually:
- `http://localhost:3000/en` — English home page with feature grid
- `http://localhost:3000/cn` — Chinese home page
- `http://localhost:3000/en/docs` — English introduction
- `http://localhost:3000/cn/docs` — Chinese introduction
- `http://localhost:3000/en/docs/guide/installation` — Installation page
- `http://localhost:3000/en/docs/developer/api-reference` — API reference
- Language switcher toggles between EN/CN
- Sidebar navigation shows correct hierarchy

- [ ] **Step 3: Fix any issues found and commit**

If build fails or pages don't render correctly, fix the issues and commit.

```bash
git add -A && git commit -m "fix: resolve build issues in documentation"
```
