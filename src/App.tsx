import { TooltipProvider } from '@/components/ui/tooltip'
import MinimalTiptapEditor from '@/editor/editor'
import { useState } from 'react'
import { Content } from '@tiptap/react'

function App() {
  const [value, setValue] = useState<Content>('')
  return (
    <TooltipProvider>
      <div className="px-4 py-12 sm:py-24">
        <main className="mx-auto w-full max-w-4xl">
          <MinimalTiptapEditor
            value={value}
            onChange={setValue}
            className="w-full"
            editorContentClassName="p-5"
            output="html"
            placeholder=""
            autofocus={true}
            editable={true}
            editorClassName="focus:outline-none"
          />
        </main>
      </div>
    </TooltipProvider>
  )
}

export default App
