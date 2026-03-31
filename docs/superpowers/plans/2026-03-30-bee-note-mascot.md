# BeeNote 吉祥物组件 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新建 `<BeeNote>` React 组件并在 5 处中文文档页面插入小蜜蜂吉祥物提示内容。

**Architecture:** 创建一个纯展示 React 组件 `bee-note.tsx`，注册到 `getMDXComponents()` 后即可在所有 `.cn.mdx` 文件中直接使用 `<BeeNote>`。无需修改框架层，改动集中在组件文件、注册文件和 5 个内容文件。

**Tech Stack:** Next.js 15, Fumadocs, Tailwind CSS v4, MDX

---

## File Map

| 操作 | 文件 | 说明 |
|------|------|------|
| 新建 | `src/components/mdx/bee-note.tsx` | BeeNote 组件实现 |
| 修改 | `src/components/mdx.tsx` | 注册 BeeNote 到 getMDXComponents |
| 修改 | `content/docs/guide/installation.cn.mdx` | 前置条件之后插入 BeeNote |
| 修改 | `content/docs/guide/quick-start.cn.mdx` | 步骤1之后插入 BeeNote |
| 修改 | `content/docs/guide/workers.cn.mdx` | 创建数字员工 + 记忆小节各插入一处 |
| 修改 | `content/docs/guide/sessions.cn.mdx` | 会话工作原理之后插入 BeeNote |

---

### Task 1: 创建 BeeNote 组件

**Files:**
- Create: `src/components/mdx/bee-note.tsx`

- [ ] **Step 1: 创建组件文件**

新建 `src/components/mdx/bee-note.tsx`，内容如下：

```tsx
import type { ReactNode } from 'react';

export function BeeNote({ children }: { children: ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 dark:bg-amber-950/20 dark:border-amber-800">
      <div className="flex items-center gap-1.5 mb-2 text-amber-700 font-medium text-sm dark:text-amber-400">
        🐝 小蜜蜂
      </div>
      <div className="text-sm text-amber-900 dark:text-amber-100 [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证 TypeScript 编译无报错**

```bash
cd /Users/tengyongzhi/work/bot-workspaces/openbee-docs
npx tsc --noEmit
```

Expected: 无输出（无报错）。如有报错检查 import 路径和类型。

- [ ] **Step 3: Commit**

```bash
git add src/components/mdx/bee-note.tsx
git commit -m "feat: add BeeNote mascot component"
```

---

### Task 2: 注册 BeeNote 到 MDX 组件系统

**Files:**
- Modify: `src/components/mdx.tsx`

- [ ] **Step 1: 在 mdx.tsx 中导入并注册 BeeNote**

将 `src/components/mdx.tsx` 改为：

```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Mermaid } from '@/components/mdx/mermaid';
import { BeeNote } from '@/components/mdx/bee-note';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Mermaid,
    BeeNote,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
```

- [ ] **Step 2: 验证 TypeScript 编译无报错**

```bash
npx tsc --noEmit
```

Expected: 无输出。

- [ ] **Step 3: Commit**

```bash
git add src/components/mdx.tsx
git commit -m "feat: register BeeNote in MDX components"
```

---

### Task 3: 插入 BeeNote — installation.cn.mdx

**Files:**
- Modify: `content/docs/guide/installation.cn.mdx`

- [ ] **Step 1: 在「前置条件」列表之后插入 BeeNote**

在 `content/docs/guide/installation.cn.mdx` 的第 10 行（前置条件列表末尾的 `- **Node.js 20+**...` 之后）、`## 通过 npm 安装` 之前插入：

```mdx
- **Node.js 20+**（仅从源码构建时需要）

<BeeNote>
  安装完 Claude Code CLI 之后记得运行 `claude login` 完成登录，不然 OpenBee 启动后数字员工跑不起来 — 这个坑踩的人不少 🐝
</BeeNote>

## 通过 npm 安装
```

最终该段落应如下所示（第 8–14 行区域）：

```mdx
## 前置条件

- **Claude CLI** — Claude Code 数字员工所需。请参阅 [Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)了解安装方法。
- **Go 1.25+**（仅从源码构建时需要）
- **Node.js 20+**（仅从源码构建时需要）

<BeeNote>
  安装完 Claude Code CLI 之后记得运行 `claude login` 完成登录，不然 OpenBee 启动后数字员工跑不起来 — 这个坑踩的人不少 🐝
</BeeNote>

## 通过 npm 安装
```

- [ ] **Step 2: 验证构建无报错**

```bash
npx next build 2>&1 | tail -20
```

Expected: 输出以 `✓ Compiled successfully` 或 `Route (app)` 列表结尾，无 MDX 解析错误。

- [ ] **Step 3: Commit**

```bash
git add content/docs/guide/installation.cn.mdx
git commit -m "docs: add BeeNote tip to installation guide"
```

---

### Task 4: 插入 BeeNote — quick-start.cn.mdx

**Files:**
- Modify: `content/docs/guide/quick-start.cn.mdx`

- [ ] **Step 1: 在步骤1代码块之后插入 BeeNote**

在 `content/docs/guide/quick-start.cn.mdx` 中，找到步骤1末尾的 `openbee config -o` 代码块后、`## 2. 启动服务器` 之前插入：

```mdx
配置默认保存到 `config.yaml`。你可以指定不同的输出路径：

```bash
openbee config -o /path/to/config.yaml
```

<BeeNote>
  第一次上手建议老老实实跑向导，别直接手动改 `config.yaml`。向导会帮你把最容易填错的地方处理好，之后有需要再手动微调 🐝
</BeeNote>

## 2. 启动服务器
```

- [ ] **Step 2: 验证构建无报错**

```bash
npx next build 2>&1 | tail -20
```

Expected: 无 MDX 解析错误。

- [ ] **Step 3: Commit**

```bash
git add content/docs/guide/quick-start.cn.mdx
git commit -m "docs: add BeeNote tip to quick start guide"
```

---

### Task 5: 插入 BeeNote — workers.cn.mdx（两处）

**Files:**
- Modify: `content/docs/guide/workers.cn.mdx`

- [ ] **Step 1: 在「创建数字员工」确认说明之后插入第一处 BeeNote**

在 `content/docs/guide/workers.cn.mdx` 中，找到「创建数字员工」小节下的这段文字：

```
Bee 会创建数字员工并向你确认。你可以在消息中指定名称、描述和初始记忆。
```

在该段落之后（`### 更新数字员工` 之前）插入：

```mdx
Bee 会创建数字员工并向你确认。你可以在消息中指定名称、描述和初始记忆。

<BeeNote>
  描述字段是路由的核心 — Bee 全靠它来决定把任务交给谁。写得越具体，路由越准确，少踩「分配错了」的坑 🐝
</BeeNote>

### 更新数字员工
```

- [ ] **Step 2: 在「用记忆塑造行为」小节末尾插入第二处 BeeNote**

在同一文件中，找到「用记忆塑造行为」小节下的最后一段：

```
你可以随时通过对话更新记忆：

> "更新小明的记忆，加上：提交代码前必须运行测试"
```

在该引用块之后（`### 为项目设置自定义工作目录` 之前）插入：

```mdx
> "更新小明的记忆，加上：提交代码前必须运行测试"

<BeeNote>
  记忆会直接写进数字员工的系统提示词，每次任务都生效。如果给同一个数字员工设了矛盾的指令（比如「简短回复」和「详细解释每一步」），它会乱的 — 定期检查一下记忆内容是个好习惯 🐝
</BeeNote>

### 为项目设置自定义工作目录
```

- [ ] **Step 3: 验证构建无报错**

```bash
npx next build 2>&1 | tail -20
```

Expected: 无 MDX 解析错误。

- [ ] **Step 4: Commit**

```bash
git add content/docs/guide/workers.cn.mdx
git commit -m "docs: add BeeNote tips to workers guide"
```

---

### Task 6: 插入 BeeNote — sessions.cn.mdx

**Files:**
- Modify: `content/docs/guide/sessions.cn.mdx`

- [ ] **Step 1: 在「会话的工作原理」小节末尾插入 BeeNote**

在 `content/docs/guide/sessions.cn.mdx` 中，找到「会话的工作原理」小节末尾的这段文字：

```
Bee 和每个数字员工维护**独立的上下文**。这意味着 Bee 记住的是协调历史，而每个数字员工记住的是自己的任务历史 — 它们互不干扰。
```

在该段落之后（`## 查看会话上下文` 之前）插入：

```mdx
Bee 和每个数字员工维护**独立的上下文**。这意味着 Bee 记住的是协调历史，而每个数字员工记住的是自己的任务历史 — 它们互不干扰。

<BeeNote>
  清了 Bee 的上下文不会动数字员工，清了某个数字员工也不影响 Bee 和其他人 — 精准清除，不误伤 🐝
</BeeNote>

## 查看会话上下文
```

- [ ] **Step 2: 验证构建无报错**

```bash
npx next build 2>&1 | tail -20
```

Expected: 无 MDX 解析错误。

- [ ] **Step 3: Commit**

```bash
git add content/docs/guide/sessions.cn.mdx
git commit -m "docs: add BeeNote tip to sessions guide"
```

---

### Task 7: 最终验证

- [ ] **Step 1: 启动开发服务器确认渲染**

```bash
pnpm dev
```

在浏览器中依次访问以下页面，确认每处 `<BeeNote>` 均显示为黄色/琥珀色提示框，包含 🐝 小蜜蜂标头：

- `http://localhost:3000/cn/docs/guide/installation`
- `http://localhost:3000/cn/docs/guide/quick-start`
- `http://localhost:3000/cn/docs/guide/workers`
- `http://localhost:3000/cn/docs/guide/sessions`

- [ ] **Step 2: 确认英文页面未受影响**

访问以下英文页面，确认无多余组件或样式变化：

- `http://localhost:3000/docs/guide/installation`
- `http://localhost:3000/docs/guide/quick-start`

- [ ] **Step 3: 确认 dark mode 渲染正常**

在浏览器切换到 dark mode，确认 BeeNote 背景为深色调（`dark:bg-amber-950/20`），文字可读。

- [ ] **Step 4: 推送到远端**

```bash
git push origin main
git push qsnh main
```
