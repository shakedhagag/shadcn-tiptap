import { forwardRef } from 'react'
import { CommandEmpty, CommandItem } from 'cmdk'
import { useCurrentEditor } from '@tiptap/react'
import { useAtomValue } from 'jotai'
import { rangeAtom } from './atoms'
import type { ComponentPropsWithoutRef } from 'react'
import type { Editor, Range } from '@tiptap/react'

interface EditorCommandItemProps {
  readonly onCommand: ({
    editor,
    range
  }: {
    editor: Editor
    range: Range
  }) => void
}

export const EditorCommandItem = forwardRef<
  HTMLDivElement,
  EditorCommandItemProps & ComponentPropsWithoutRef<typeof CommandItem>
>(({ children, onCommand, ...rest }, ref) => {
  const { editor } = useCurrentEditor()
  const range = useAtomValue(rangeAtom)

  if (!editor || !range) return null

  return (
    <CommandItem
      ref={ref}
      {...rest}
      onSelect={() => {
        onCommand({ editor, range })
      }}
    >
      {children}
    </CommandItem>
  )
})

EditorCommandItem.displayName = 'EditorCommandItem'

export const EditorCommandEmpty = CommandEmpty

export default EditorCommandItem