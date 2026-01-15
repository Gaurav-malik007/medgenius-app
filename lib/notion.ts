import { NotionAPI } from 'notion-client'

// 1. Initialize the Client for Rendering Pages
export const notion = new NotionAPI()

// 2. Define the 'Question' Type (This fixes the current error)
export interface Question {
  id: string
  question: string
  answer: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

// 3. Define the Helper Function to Fetch Tables
export async function getDatabase(databaseId: string) {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
      }),
      cache: 'no-store'
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    return []
  }
}
