import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nUI } from '@/lib/layout.shared';

export default async function LangLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  return (
    <RootProvider i18n={i18nUI.provider(lang)}>
      {children}
    </RootProvider>
  );
}
