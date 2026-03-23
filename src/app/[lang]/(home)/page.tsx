import Link from 'next/link';
import { MessageSquare, Bot, Clock, Wrench } from 'lucide-react';

const translations = {
  en: {
    tagline: 'Run Claude Code as Your Digital Workers',
    description:
      'OpenBee turns Claude Code into autonomous workers that communicate through Lark, DingTalk, WeCom, and Telegram. Multi-step task planning, persistent memory, and extensible MCP tools.',
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
        desc: 'Claude Code agents with persistent memory and autonomous execution',
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
    tagline: '将 Claude Code 作为你的数字工作者运行',
    description:
      'OpenBee 将 Claude Code 变为自主工作者，通过飞书、钉钉、企业微信和 Telegram 进行沟通。支持多步骤任务规划、持久记忆和可扩展的 MCP 工具。',
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
        desc: '具有持久记忆和自主执行能力的 Claude Code 代理',
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
