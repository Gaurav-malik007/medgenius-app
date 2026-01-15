'use client' // This forces the browser to handle the rendering, not the server

import { NotionRenderer } from 'react-notion-x'
// Import styles locally to avoid server build issues
import 'react-notion-x/src/styles.css'

export default function NotionReader({ recordMap }: { recordMap: any }) {
  if (!recordMap) return null

  return (
    <NotionRenderer 
      recordMap={recordMap} 
      fullPage={true} 
      darkMode={false}
      disableHeader={true}
      previewImages={false}
    />
  )
}
