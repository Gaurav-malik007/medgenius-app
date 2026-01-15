import { NotionRenderer } from 'react-notion-x'
import { notion } from '@/lib/notion' // Use the shared client
import FlashcardDeck from '@/components/FlashcardDeck'

// 1. DISABLING CACHE is the key to fixing the Vercel Build Error
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function ChapterPage({ params }: { params: { id: string } }) {
  let recordMap = null

  try {
    // Safety Check: If ID is missing or weird during build, skip fetch
    if (!params?.id || params.id === 'undefined') {
         return null
    }
    recordMap = await notion.getPage(params.id)
  } catch (error) {
    console.error("Build safety catch:", error)
    // If fetch fails, we just render a simple error message instead of crashing the build
    return (
        <div className="p-12 text-center text-red-500">
            Unable to load chapter. Please check Notion permissions.
        </div>
    )
  }

  if (!recordMap) return null

  // Mock Questions for now to ensure stability
  const questions: any[] = []

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <a href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900">
          ← Back to Library
        </a>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <NotionRenderer 
          recordMap={recordMap} 
          fullPage={true} 
          darkMode={false}
          disableHeader={true}
        />
      </main>

      {questions.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <FlashcardDeck questions={questions} />
        </section>
      )}
    </div>
  )
}
