import Editor from '@monaco-editor/react'
import { useEffect } from 'react'

import { useData } from '../contexts/DataContext'

export const CodeEditor = () => {
  const { code, setCode, memResults } = useData()

  useEffect(() => {
    if (memResults.length > 0) {
      // memResults is sort by estimatedTimeSaved in descending order
      const { lineNumbers, estimatedTimeSaved, numCalled } = memResults[0]
      // add message before each line in lines
      const codeLines = code.split('\n')
      for (let i = 0; i < codeLines.length; i++) {
        if (lineNumbers.includes(i + 1)) {
          const tabs = codeLines[i].match(/^\s*/)?.[0] ?? ''
          codeLines[i] =
            `${tabs}# this line was called ${numCalled} times\n${tabs}# ` +
            `you can save ${estimatedTimeSaved.toFixed(10)} ms by optimizing it!\n${codeLines[i]}`
        }
      }
      setCode(codeLines.join('\n'))
    }
  }, [memResults])

  return (
    <Editor
      defaultLanguage="python"
      value={code}
      onChange={(value) => setCode(value || '')}
      theme="light"
      options={{
        scrollBeyondLastLine: false,
        minimap: { enabled: false }
      }}
      loading=""
    />
  )
}
