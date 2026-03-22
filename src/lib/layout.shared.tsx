import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'fuma-nama',
  repo: 'fumadocs',
  branch: 'main',
};

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  cn: {
    displayName: '中文',
    search: '搜索文档',
  },
});

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: 'My App',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
