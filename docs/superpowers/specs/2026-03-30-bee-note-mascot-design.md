# BeeNote 吉祥物组件设计

**日期：** 2026-03-30
**状态：** 已确认

## 背景

OpenBee 文档目前使用通用的 `<Callout>` 组件来展示提示信息，缺乏产品个性。本次新增「小蜜蜂」吉祥物元素，以贯穿式引导角色的形式出现在各文档页面中，用第一人称亲切口吻为用户提供实用小贴士。

## 目标

- 新增 `<BeeNote>` 自定义 MDX 组件，视觉上与普通 Callout 有明显区别
- 在 5 处关键文档位置插入小蜜蜂提示，覆盖中文页面（`.cn.mdx`）
- 不破坏现有英文文档和组件体系

## 方案选择

采用**方案 2：自定义 `<BeeNote>` 组件**（排除方案 1 复用 Callout 无个性、方案 3 hack 框架维护成本高）。

## 组件设计

### 文件位置

`src/components/mdx/bee-note.tsx`

### 视觉规格

- **背景色：** `bg-amber-50`（dark: `dark:bg-amber-950/20`）
- **边框：** `border border-amber-200`（dark: `dark:border-amber-800`）
- **头部标签：** 🐝 小蜜蜂，颜色 `text-amber-700`（dark: `dark:text-amber-400`）
- **内容文字：** `text-sm text-amber-900`（dark: `dark:text-amber-100`）
- **圆角：** `rounded-lg`
- **间距：** `p-4 my-4`

### 使用方式

```mdx
<BeeNote>
  第一次用的话，建议先用向导 `openbee config`，别手动改 yaml，踩过坑的 🐝
</BeeNote>
```

### 注册方式

在 `src/components/mdx.tsx` 的 `getMDXComponents()` 函数中添加 `BeeNote`，与现有 `Mermaid` 注册方式保持一致。

## 内容插入计划

仅在中文页面（`.cn.mdx`）插入，共 5 处：

| 页面 | 插入位置 | 提示内容 |
|------|---------|---------|
| `content/docs/guide/quick-start.cn.mdx` | 步骤1「生成配置」代码块之后 | 建议第一次用向导而非手动改 yaml |
| `content/docs/guide/workers.cn.mdx` | 「创建数字员工」示例之后 | 描述字段是路由的核心，写清楚最重要 |
| `content/docs/guide/workers.cn.mdx` | 「用记忆塑造行为」小节之后 | 记忆直接写进系统提示词，避免内容矛盾 |
| `content/docs/guide/sessions.cn.mdx` | 「会话的工作原理」小节之后 | Bee 和数字员工的上下文相互独立 |
| `content/docs/guide/installation.cn.mdx` | 「前置条件」之后 | Claude Code CLI 需要先 `claude login` 才能运行 |

## 非目标

- 不修改英文页面（`.mdx`）
- 不新增角色介绍页（留待后续）
- 不为小蜜蜂设计图形资产（用 emoji 🐝 替代）
- 不修改 Fumadocs 框架层代码

## 实施顺序

1. 创建 `src/components/mdx/bee-note.tsx` 组件
2. 在 `src/components/mdx.tsx` 注册 `BeeNote`
3. 依次向 5 个 `.cn.mdx` 文件插入 `<BeeNote>` 内容
4. 本地验证样式渲染正常
