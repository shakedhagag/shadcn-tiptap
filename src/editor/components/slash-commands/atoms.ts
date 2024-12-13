import { atom } from 'jotai'
import type { Range } from '@tiptap/react'

export const queryAtom = atom('')
export const rangeAtom = atom<Range | null>(null)
