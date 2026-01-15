
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, BrainCircuit, Sparkles } from 'lucide-react';
import { Question } from '@/lib/notion';

interface FlashcardDeckProps {
  questions: Question[];
}

export default function FlashcardDeck({ questions }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 p-16 text-center max-w-2xl mx-auto">
        <BrainCircuit className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Gym Database Empty</h3>
        <p className="text-slate-500 font-medium">Add rows to your 'Gym' database in Notion linked to this chapter.</p>
      </div>
    );
  }

  const current = questions[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }, 150);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
    }, 150);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12">
      {/* Tracker */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Recall Active</span>
        </div>
        <div className="text-xs font-black text-teal-700 bg-teal-50 px-5 py-2 rounded-full border border-teal-100 shadow-sm">
          {currentIndex + 1} OF {questions.length}
        </div>
      </div>

      {/* Card Wrapper */}
      <div 
        className="relative h-[480px] w-full cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 180, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side */}
          <div 
            className="absolute inset-0 bg-white border border-slate-200 rounded-[4rem] shadow-2xl p-14 flex flex-col justify-center items-center text-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-12 left-14 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-500/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600/30">Question</span>
            </div>
            
            <p className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
              {current.question}
            </p>
            
            <div className="absolute bottom-12 flex items-center gap-2 text-slate-300 text-[10px] font-black tracking-[0.2em] uppercase">
              <RotateCcw className="w-4 h-4" /> Tap to reveal answer
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="absolute inset-0 bg-teal-600 border border-teal-500 rounded-[4rem] shadow-2xl p-14 flex flex-col justify-center items-center text-center backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-12 left-14 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Answer</span>
            </div>
            
            <p className="text-2xl font-medium text-white leading-relaxed">
              {current.answer}
            </p>
            
            <div className="absolute bottom-12 flex items-center gap-2 text-white/30 text-[10px] font-black tracking-[0.2em] uppercase">
              <RotateCcw className="w-4 h-4" /> Tap to see question
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-12">
        <button
          onClick={handlePrev}
          className="p-6 rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all border border-slate-100 active:scale-90"
        >
          <ChevronLeft className="w-8 h-8 text-slate-400 hover:text-teal-600" />
        </button>
        
        <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase border-2 shadow-sm ${
          current.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
          current.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
          'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {current.difficulty}
        </div>
        
        <button
          onClick={handleNext}
          className="p-6 rounded-[2rem] bg-white shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all border border-slate-100 active:scale-90"
        >
          <ChevronRight className="w-8 h-8 text-slate-400 hover:text-teal-600" />
        </button>
      </div>
    </div>
  );
}
