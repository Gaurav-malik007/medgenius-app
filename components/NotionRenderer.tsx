
"use client";

import React from 'react';
import { NotionRenderer as ReactNotionX } from 'react-notion-x';

interface NotionRendererProps {
  // Make recordMap optional to fix type errors when only fallback content is provided
  recordMap?: any;
  fallbackContent?: string;
}

export default function NotionRenderer({ recordMap, fallbackContent }: NotionRendererProps) {
  if (recordMap) {
    return (
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 sm:p-12 overflow-hidden">
        <ReactNotionX recordMap={recordMap} fullPage={false} darkMode={false} />
      </div>
    );
  }

  // Demo Fallback
  return (
    <article className="max-w-4xl mx-auto py-16 px-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="prose prose-slate prose-lg lg:prose-xl max-w-none">
        {fallbackContent?.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-serif font-bold text-slate-900 mb-8 pb-4 border-b">{line.replace('# ', '')}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-slate-800 mt-10 mb-4">{line.replace('## ', '')}</h2>;
          if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-slate-700 mt-8 mb-3">{line.replace('### ', '')}</h3>;
          if (line.match(/^\d+\./)) return <li key={i} className="ml-6 list-decimal mb-2 text-slate-600">{line.replace(/^\d+\. /, '')}</li>;
          if (line === '') return <br key={i} />;
          return <p key={i} className="text-lg leading-relaxed text-slate-600 mb-4">{line}</p>;
        })}
      </div>
    </article>
  );
}
