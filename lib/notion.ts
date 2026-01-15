
import { NotionAPI } from 'notion-client';

export interface Chapter {
  id: string;
  title: string;
  category: string;
  lastRead: string;
  content: string;
  description: string;
  coverImage: string;
}

export interface Question {
  id: string;
  chapterId: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const notion = new NotionAPI({
  authToken: process.env.NOTION_KEY
});

const MOCK_CHAPTERS: Chapter[] = [
  {
    id: 'ch-1',
    title: 'Cardiovascular Physiology',
    category: 'Physiology',
    lastRead: '2 days ago',
    description: 'Mastering cardiac cycle phases, heart sounds, and pressure-volume relationship.',
    content: '# Cardiovascular Physiology\n\nThe cardiac cycle describes the sequence of events from the beginning of one heartbeat to the next.\n\n## Key Concepts\n- Isovolumetric Contraction\n- Ventricular Ejection\n- Stroke Volume Calculation',
    coverImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ch-2',
    title: 'Renal Clearance & GFR',
    category: 'Renal',
    lastRead: 'Just now',
    description: 'Mechanisms of glomerular filtration, tubular reabsorption, and secretion.',
    content: '# Renal Clearance\n\nRenal clearance measures the efficiency with which the kidneys remove substances from the plasma.\n\n### GFR Calculation\nGFR is best measured using Inulin or estimated via Creatinine.',
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800'
  }
];

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    chapterId: 'ch-1',
    question: 'Which heart sound is caused by the closure of AV valves?',
    answer: 'The first heart sound (S1), marking the onset of ventricular systole.',
    difficulty: 'Easy'
  },
  {
    id: 'q-2',
    chapterId: 'ch-1',
    question: 'How does sympathetic stimulation affect the Frank-Starling curve?',
    answer: 'It shifts the curve upward and to the left, increasing stroke volume for a given end-diastolic volume.',
    difficulty: 'Hard'
  },
  {
    id: 'q-3',
    chapterId: 'ch-2',
    question: 'What is the primary site of glucose reabsorption in the nephron?',
    answer: 'The Proximal Convoluted Tubule (PCT) via SGLT2 transporters.',
    difficulty: 'Medium'
  }
];

export async function getAllChapters(): Promise<Chapter[]> {
  // Logic to query process.env.NOTION_LIBRARY_ID
  return MOCK_CHAPTERS;
}

export async function getChapter(pageId: string) {
  try {
    if (process.env.NOTION_KEY) {
      return await notion.getPage(pageId);
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch Notion page:", error);
    return null;
  }
}

export async function getQuestionsForChapter(chapterId: string): Promise<Question[]> {
  // Logic to query process.env.NOTION_GYM_ID with filter for related chapter
  return MOCK_QUESTIONS.filter(q => q.chapterId === chapterId);
}

export async function getMockChapterById(id: string) {
  return MOCK_CHAPTERS.find(c => c.id === id);
}
