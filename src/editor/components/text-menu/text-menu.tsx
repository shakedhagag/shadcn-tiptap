/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Icon } from '@/components/ui/icon'
import { Toolbar } from '../../components/toolbar'
import { useTextmenuCommands } from '../../hooks/use-text-menu-commands'
import { useTextmenuStates } from '../../hooks/use-text-menu-states'
import { BubbleMenu, Editor } from '@tiptap/react'
import { memo } from 'react'
import { ColorPicker } from '../../components/panels'
import { useTextmenuContentTypes } from '../../hooks/use-text-menu-content-types'
import { ContentTypePicker } from './content-type-picker'
import { LinkEditPopover } from '../link/link-edit-popover'
import { Tooltip } from '../../components/editor-tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

// Memorized components
const MemoButton = memo(Toolbar.Button)
const MemoColorPicker = memo(ColorPicker)
const MemoContentTypePicker = memo(ContentTypePicker)
export type TextMenuProps = {
  editor: Editor
}

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: 'top-start',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8
              }
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end']
              }
            }
          ]
        },
        maxWidth: 'calc(100vw - 16px)'
      }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <Toolbar.Wrapper>
        <Toolbar.Divider />
        <MemoContentTypePicker options={blockOptions} />

        <Toolbar.Divider />

        <Tooltip title="Bold" shortcut={['Mod', 'B']}>
          <MemoButton onClick={commands.onBold} active={states.isBold}>
            <Icon name="Bold" />
          </MemoButton>
        </Tooltip>

        <Tooltip title="Italic" shortcut={['Mod', 'I']}>
          <MemoButton onClick={commands.onItalic} active={states.isItalic}>
            <Icon name="Italic" />
          </MemoButton>
        </Tooltip>

        <Tooltip title="Underline" shortcut={['Mod', 'U']}>
          <MemoButton
            onClick={commands.onUnderline}
            active={states.isUnderline}
          >
            <Icon name="Underline" />
          </MemoButton>
        </Tooltip>

        <Tooltip title="Strikethrough" shortcut={['Mod', 'Shift', 'S']}>
          <MemoButton onClick={commands.onStrike} active={states.isStrike}>
            <Icon name="Strikethrough" />
          </MemoButton>
        </Tooltip>

        <Tooltip title="Code" shortcut={['Mod', 'E']}>
          <MemoButton onClick={commands.onCode} active={states.isCode}>
            <Icon name="Code" />
          </MemoButton>
        </Tooltip>

        <Tooltip title="Code block">
          <MemoButton onClick={commands.onCodeBlock}>
            <Icon name="FileCode" />
          </MemoButton>
        </Tooltip>

        <LinkEditPopover editor={editor} />

        <Popover>
          <PopoverTrigger asChild>
            <Tooltip title="Highlight text">
              <MemoButton active={!!states.currentHighlight}>
                <Icon name="Highlighter" />
              </MemoButton>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            sideOffset={8}
            className="p-1"
          >
            <MemoColorPicker
              color={states.currentHighlight}
              onChange={commands.onChangeHighlight}
              onClear={commands.onClearHighlight}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Tooltip title="Text color">
              <MemoButton active={!!states.currentColor}>
                <Icon name="Palette" />
              </MemoButton>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="start"
            sideOffset={8}
            className="p-1"
          >
            <MemoColorPicker
              color={states.currentColor}
              onChange={commands.onChangeColor}
              onClear={commands.onClearColor}
            />
          </PopoverContent>
        </Popover>
      </Toolbar.Wrapper>
    </BubbleMenu>
  )
}
