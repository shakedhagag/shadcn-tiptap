import { Icon } from '@/components/ui/icon'
import { Toolbar } from '../toolbar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { useCallback } from 'react'

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' }
    ]
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' }
    ]
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' }
    ]
  }
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options
]).flat()

export type FontFamilyPickerProps = {
  onChange: (value: string) => void
  value: string
}

export const FontFamilyPicker = ({
  onChange,
  value
}: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value)
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter'

  const selectFont = useCallback(
    (font: string) => () => {
      onChange(font)
    },
    [onChange]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentFontLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px]">
        {FONT_FAMILY_GROUPS.map((group, index) => (
          <div key={group.label}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.options.map((font) => (
              <DropdownMenuItem
                key={`${font.label}_${font.value}`}
                onSelect={selectFont(font.value)}
                className={value === font.value ? 'bg-accent' : ''}
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
