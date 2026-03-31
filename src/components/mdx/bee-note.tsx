import type { ReactNode } from 'react';

export function BeeNote({ children }: { children: ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4 dark:bg-amber-950/20 dark:border-amber-800">
      <div className="flex items-center gap-1.5 mb-2 text-amber-700 font-medium text-sm dark:text-amber-400">
        🐝 小蜜蜂
      </div>
      <div className="text-sm text-amber-900 dark:text-amber-100 [&>p]:mb-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
