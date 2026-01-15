import { NotionAPI } from 'notion-client'

// 1. Initialize the Client for Rendering Pages (Unofficial API)
export const notion = new NotionAPI()

// 2. Define the Helper Function to Fetch Tables (Official API)
export async function getDatabase(databaseId: string) {
  try {
    // We use standard fetch to avoid installing extra packages
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100, // Fetch up to 100 chapters/questions
      }),
      cache: 'no-store' // Ensure we always get fresh data
    })

    if (!response.ok) {
      console.error("Notion API Error:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Failed to fetch database:", error)
    return []
  }
}
