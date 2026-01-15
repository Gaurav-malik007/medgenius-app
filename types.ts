
export interface Chapter {
  id: string;
  title: string;
  category: string;
  lastRead: string;
  content: string; // Markdown or Rich Text
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

export interface NotionPage {
  id: string;
  properties: any;
  content: any;
}
