# openbee-docs

Official documentation site for [OpenBee](https://github.com/theopenbee/openbee) — a digital worker solution that runs Agents as autonomous workers communicating through IM platforms.

**Live site**: https://docs.theopenbee.com

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework
- [Fumadocs](https://fumadocs.dev/) — Documentation framework (UI + MDX)
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [Mermaid](https://mermaid.js.org/) — Diagram rendering
- [Vercel Analytics](https://vercel.com/analytics) — Site analytics

## Content Structure

All documentation lives in `content/docs/` and is bilingual (English + Chinese):

```
content/docs/
├── guide/                  # User guides
│   ├── installation.mdx
│   ├── quick-start.mdx
│   ├── tasks.mdx
│   ├── workers.mdx
│   ├── sessions.mdx
│   ├── constraints.mdx
│   ├── backup.mdx
│   ├── upgrade.mdx
│   ├── uninstall.mdx
│   ├── commands/           # CLI commands
│   │   ├── engine.mdx
│   │   ├── clear.mdx
│   │   ├── list.mdx
│   │   ├── status.mdx
│   │   └── stop.mdx
│   ├── platforms/          # IM platform integrations
│   │   ├── feishu.mdx      # Lark / Feishu
│   │   ├── dingtalk.mdx
│   │   ├── wecom.mdx
│   │   ├── weixin.mdx
│   │   ├── telegram.mdx
│   │   └── linear.mdx
│   └── use-cases/          # Use case tutorials
│       ├── claude-code-dev.mdx
│       └── shell-commands.mdx
└── developer/              # Developer documentation
    ├── architecture.mdx
    ├── api-reference.mdx
    ├── ctl-reference.mdx
    ├── data-models.mdx
    └── contributing.mdx
```

Each `.mdx` file has a corresponding `.cn.mdx` Chinese translation and `meta.json` / `meta.cn.json` for sidebar configuration.

## Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

Build for production:

```bash
pnpm build
```

Type check:

```bash
pnpm types:check
```

## Key Files

| File | Description |
|------|-------------|
| `source.config.ts` | Fumadocs content source configuration, MDX plugins (Mermaid) |
| `src/lib/source.ts` | Content source adapter exposing the `loader()` API |
| `src/lib/layout.shared.tsx` | Shared layout options across the docs site |
| `src/app/[lang]/` | Localized app routes (English + Chinese) |
| `src/app/api/search/route.ts` | Full-text search route handler |

## Contributing

When adding or updating documentation:

1. Add both the English (`.mdx`) and Chinese (`.cn.mdx`) versions
2. Update the corresponding `meta.json` / `meta.cn.json` to include the page in the sidebar
3. Run `pnpm dev` to preview changes locally
