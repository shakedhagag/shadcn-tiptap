import { Editor } from '@tiptap/react'

import {  HorizontalRule,  Link} from '@/editor/extensions'

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!
  }

  const gripColumn = container?.closest('td, th')?.getElementsByClassName('grip-column selected')[0]
  const gripRow = container?.closest('td, th')?.getElementsByClassName('grip-row selected')[0]

  if (gripColumn || gripRow) {
    return true
  }

  return false
}

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    HorizontalRule.name,
    Link.name,
  ]

  return customNodes.some(type => editor.isActive(type)) || isTableGripSelected(node)
}

export default isCustomNodeSelected
