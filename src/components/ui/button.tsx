import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 dark:text-white dark:hover:bg-neutral-900 dark:active:bg-neutral-800',
        tertiary:
          'bg-neutral-50 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-900 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
        quaternary: 'bg-background text-foreground hover:bg-accent',
        ghost:
          'border-transparent bg-transparent text-neutral-500 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200',
        primary:
          'border-black bg-black text-white hover:bg-neutral-800 active:bg-neutral-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:active:bg-neutral-300',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-8 w-8',
        iconSmall: 'h-6 w-6',
        medium: 'px-3 py-2',
        small: 'px-2 py-1'
      },
      active: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        active: true,
        variant: 'primary',
        className: 'bg-neutral-900 dark:bg-neutral-300'
      },
      {
        active: true,
        variant: 'secondary',
        className: 'bg-neutral-200 dark:bg-neutral-800'
      },
      {
        active: true,
        variant: 'tertiary',
        className: 'bg-neutral-200 dark:bg-neutral-800'
      },
      {
        active: true,
        variant: 'ghost',
        className:
          'bg-black/10 text-neutral-800 dark:bg-white/20 dark:text-neutral-200'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      active: false
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  active?: boolean
  activeClassname?: string
  buttonSize?: 'medium' | 'small' | 'icon' | 'iconSmall'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      active,
      activeClassname,
      buttonSize,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    // Map buttonSize to size if provided
    const mappedSize = buttonSize ? buttonSize : size

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size: mappedSize,
            active,
            className: cn(className, active && activeClassname)
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
