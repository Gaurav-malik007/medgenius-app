import Link from 'next/link'
import { getDatabase } from '@/lib/notion'

// This line forces the page to load fresh data every time (Fixes build errors)
export const dynamic = 'force-dynamic'

export default async function Home() {
  let chapters = []
  
  try {
    const libraryId = process.env.NOTION_LIBRARY_ID
    if (libraryId) {
      chapters = await getDatabase(libraryId)
    }
  } catch (error) {
    console.error("Failed to fetch chapters:", error)
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            MEDGENIUS
          </h1>
          <p className="text-slate-500 text-lg">Your Medical External Brain</p>
        </header>

        <div className="grid gap-4">
          {chapters.length === 0 ? (
             <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
               {process.env.NOTION_LIBRARY_ID ? "No chapters found. Check your Library ID." : "Library ID missing in Vercel."}
             </div>
          ) : (
            chapters.map((chapter: any) => (
              <Link 
                key={chapter.id} 
                href={`/chapter/${chapter.id}`}
                className="block group"
              >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-400 transition-all">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600">
                    {chapter.properties?.Name?.title?.[0]?.plain_text || "Untitled Chapter"}
                  </h2>
                  <div className="flex gap-2 mt-3">
                    {chapter.properties?.Tags?.multi_select?.map((tag: any) => (
                      <span key={tag.id} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md uppercase">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
