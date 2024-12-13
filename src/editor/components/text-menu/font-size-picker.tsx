import { Icon } from '@/components/ui/icon'
import { Toolbar } from '@/editor/components/toolbar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useCallback } from 'react'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' }
]

export type FontSizePickerProps = {
  onChange: (value: string) => void
  value: string
}

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value)
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium'

  const selectSize = useCallback(
    (size: string) => () => {
      onChange(size)
    },
    [onChange]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentSizeLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[140px]">
        {FONT_SIZES.map((size) => (
          <DropdownMenuItem
            key={`${size.label}_${size.value}`}
            onSelect={selectSize(size.value)}
            className={value === size.value ? 'bg-accent' : ''}
          >
            <span style={{ fontSize: size.value || '16px' }}>{size.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
