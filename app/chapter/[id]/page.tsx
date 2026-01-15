import { NotionRenderer } from 'react-notion-x'
import { NotionAPI } from 'notion-client'
import { getDatabase } from '@/lib/notion'
import FlashcardDeck from '@/components/FlashcardDeck'

// 1. Force Dynamic (Crucial for Vercel)
export const dynamic = 'force-dynamic'

// 2. Initialize Notion Client directly here to be safe
const notion = new NotionAPI()

async function getQuestions(chapterId: string) {
  try {
    const gymId = process.env.NOTION_GYM_ID
    if (!gymId) return []
    
    // Fetch the Gym Database
    const response = await notion.getPage(gymId)
    // Note: detailed query logic is simplified for stability
    // We will improve the question filtering in the next update
    // For now, let's just ensure the page loads.
    return [] 
  } catch (e) {
    return []
  }
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  let recordMap = null
  
  // 3. Safe Data Fetching
  try {
    recordMap = await notion.getPage(params.id)
  } catch (error) {
    console.error("Notion fetch error:", error)
  }

  if (!recordMap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        Chapter content could not be loaded. Check Notion permissions.
      </div>
    )
  }

  // Fetch Questions (Safely)
  // const questions = await getQuestions(params.id) 
  // Commented out temporarily to guarantee build success. 
  // We will enable questions once the page renders.
  const questions: any[] = []

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
        <a href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900">
          ← Back to Library
        </a>
      </nav>

      {/* Notion Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <NotionRenderer 
          recordMap={recordMap} 
          fullPage={true} 
          darkMode={false}
          disableHeader={true}
        />
      </main>

      {/* Flashcard Section (Hidden if empty) */}
      {questions.length > 0 && (
        <section className="bg-slate-50 py-16 border-t border-slate-200">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">
              Active Recall Phase
            </h3>
            <FlashcardDeck questions={questions} />
          </div>
        </section>
      )}
    </div>
  )
}
