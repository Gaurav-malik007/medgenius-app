export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { Search, Plus, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { getAllChapters } from '@/lib/notion';

export default async function Dashboard() {
  const chapters = await getAllChapters();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              Notion Library
            </div>
            <h1 className="text-5xl font-serif font-extrabold text-slate-900 leading-tight">Curriculum</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search medical chapters..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all w-full md:w-80 shadow-sm font-medium"
              />
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white p-3.5 rounded-2xl shadow-xl shadow-teal-600/20 transition-all active:scale-95">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter) => (
            <Link 
              href={`/chapter/${chapter.id}`} 
              key={chapter.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="h-52 relative overflow-hidden">
                <img 
                  src={chapter.coverImage} 
                  alt={chapter.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-sm">
                  <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{chapter.category}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{chapter.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">{chapter.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    {chapter.lastRead}
                  </div>
                  <div className="flex items-center gap-1 text-teal-600 text-sm font-black group-hover:gap-3 transition-all uppercase tracking-tighter">
                    Study <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
