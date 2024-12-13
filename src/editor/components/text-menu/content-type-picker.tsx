import { Icon } from '@/components/ui/icon'
import { icons } from 'lucide-react'
import { useMemo } from 'react'
import { Toolbar } from '../toolbar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

export type ContentTypePickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: keyof typeof icons
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerOption => option.type === 'option'
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerCategory => option.type === 'category'

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === 'option' && option.isActive()),
    [options]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Toolbar.Button
          active={activeItem?.id !== 'paragraph' && !!activeItem?.type}
        >
          <Icon
            name={activeItem?.type === 'option' ? activeItem.icon : 'Pilcrow'}
          />
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px]">
        {options.map((option, index) => {
          if (isOption(option)) {
            return (
              <DropdownMenuItem
                key={option.id}
                onSelect={option.onClick}
                disabled={option.disabled()}
                className={option.isActive() ? 'bg-accent' : ''}
              >
                <Icon name={option.icon} className="mr-2 h-4 w-4" />
                <span>{option.label}</span>
              </DropdownMenuItem>
            )
          } else if (isCategory(option)) {
            return (
              <div key={option.id}>
                {index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel>{option.label}</DropdownMenuLabel>
              </div>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
