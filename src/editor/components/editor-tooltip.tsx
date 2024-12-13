import React, { forwardRef } from 'react'
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const ShortcutKey = ({ children }: { children: string }): React.JSX.Element => {
  const isMac =
    typeof window !== 'undefined' ? navigator.userAgent.includes('Mac') : false

  const className =
    'inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2'

  if (children === 'Mod') {
    return <kbd className={className}>{isMac ? '⌘' : 'Ctrl'}</kbd>
  }

  if (children === 'Shift') {
    return <kbd className={className}>⇧</kbd>
  }

  if (children === 'Alt') {
    return <kbd className={className}>{isMac ? '⌥' : 'Alt'}</kbd>
  }

  return <kbd className={className}>{children}</kbd>
}

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode
  enabled?: boolean
  title?: React.ReactNode
  shortcut?: string[]
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, enabled = true, title, shortcut, ...props }, ref) => {
    if (!enabled) {
      return <>{children}</>
    }

    return (
      <TooltipProvider delayDuration={500}>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <span ref={ref} {...props}>
              {children}
            </span>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={8}
            className={cn(
              'flex items-center gap-2 px-2.5 py-1',
              'bg-white border border-neutral-100 rounded-lg shadow-sm',
              'dark:bg-neutral-900 dark:border-neutral-800'
            )}
          >
            {title && (
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {title}
              </span>
            )}
            {shortcut && (
              <span className="flex items-center gap-0.5">
                {shortcut.map((shortcutKey) => (
                  <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
                ))}
              </span>
            )}
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
