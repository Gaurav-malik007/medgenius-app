
import { getChapter, getQuestionsForChapter, getMockChapterById } from '@/lib/notion';
import FlashcardDeck from '@/components/FlashcardDeck';
import { BookOpen, BrainCircuit, ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

interface ChapterPageProps {
  params: { id: string };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id } = params;
  const recordMap = await getChapter(id);
  const questions = await getQuestionsForChapter(id);
  const metadata = await getMockChapterById(id);

  if (!recordMap && !metadata) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] shadow-2xl p-16 text-center max-w-lg border border-slate-100">
          <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <GraduationCap className="w-12 h-12 text-rose-500" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Chapter Missing</h1>
          <p className="text-slate-500 mb-10 leading-relaxed text-lg">We couldn't sync this material from your Notion Library. Please verify the relation in Notion.</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-3 w-full py-5 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-600/20 hover:bg-teal-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] transition-colors mb-12 uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>

        {/* Page Header */}
        <header className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-teal-50 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-teal-100">
            {metadata?.category || "Reading Phase"}
          </span>
          <h1 className="text-6xl md:text-7xl font-serif font-extrabold text-slate-900 mb-8 leading-[1.05] tracking-tight">
            {metadata?.title || "Notion Document"}
          </h1>
          <div className="flex items-center justify-center gap-10 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2.5 text-teal-600">
              <BookOpen className="w-4 h-4" /> Reading
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="flex items-center gap-2.5">
              <BrainCircuit className="w-4 h-4" /> Active Recall
            </div>
          </div>
        </header>

        {/* CMS Body */}
        <section className="mb-24">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200/60 overflow-hidden">
            {recordMap ? (
              <div className="p-4 sm:p-10">
                <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
              </div>
            ) : (
              <div className="prose prose-slate prose-xl max-w-none p-12 sm:p-20 font-medium text-slate-600 leading-relaxed">
                {metadata?.content.split('\n').map((line, i) => (
                  <p key={i} className="mb-6">{line}</p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quiz Section */}
        <section id="recall-gym" className="border-t border-slate-200 pt-24 pb-40">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-[2rem] text-white shadow-2xl shadow-teal-600/30 mb-8">
              <BrainCircuit className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-serif font-extrabold text-slate-900 mb-3 tracking-tight">Active Recall Gym</h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed">
              Synthesize what you've just read. Test your long-term retention by flipping these flashcards.
            </p>
          </div>
          
          <FlashcardDeck questions={questions} />
        </section>
      </div>
    </div>
  );
}
