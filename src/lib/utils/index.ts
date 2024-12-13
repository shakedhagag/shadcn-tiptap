import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createStore } from "jotai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const shadcnEditorStore = createStore()



export function randomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)]
}

export * from './css-var'
export * from './get-render-container'
export * from './is-custom-node-selected'
export * from './is-text-selected'
