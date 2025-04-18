import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import markdownStyles from './markdown-styles.module.css';

type Props = {};

export function PostBody({ children }: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        'prose dark:prose-dark mx-auto max-w-2xl',
        markdownStyles.markdown,
      )}
    >
      {children}
    </div>
  );
}
