'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

interface Props {
  data: SerializedEditorState
}

export const RichText = ({ data }: Props) => {
  if (!data || !Array.isArray(data.root?.children)) return null

  const html = convertLexicalToHTML({ data })

  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
