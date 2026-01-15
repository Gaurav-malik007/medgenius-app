import dynamic from 'next/dynamic'
import { notion } from '@/lib/notion'
import FlashcardDeck from '@/components/FlashcardDeck'

// 1. LAZY LOAD the Reader (This bypasses the Vercel Build Error)
const NotionReader = dynamic(() => import('@/components/NotionReader'), {
  ssr: false, // strictly client-side only
})

// 2. Force Dynamic Mode
export const dynamicParams = true
export const revalidate = 0

export default async function ChapterPage({ params }: { params: { id: string } }) {
  let recordMap = null

  try {
    // Safety check for the ID
    if (params.id && params.id !== 'undefined') {
        recordMap = await notion.getPage(params.id)
    }
  } catch (error) {
    console.error("Page Load Error:", error)
  }

  // If no data, show a simple error but DON'T crash
  if (!recordMap) {
      return (
          <div className="min-h-screen flex items-center justify-center text-slate-400">
              Loading chapter... (or check Notion permissions)
          </div>
      )
  }

  // Mock questions for stability
  const questions: any[] = []

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <a href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900">
          ← Back to Library
        </a>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* The Reader is now isolated and won't crash the server build */}
        <NotionReader recordMap={recordMap} />
      </main>

      {questions.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <FlashcardDeck questions={questions} />
        </section>
      )}
    </div>
  )
}
