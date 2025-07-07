import { callOpenAIWithHistory } from "./openai";

export async function convertDocumentToMarkdown(file: File, content: string): Promise<string> {
  // For non-CSV files, return simple markdown
  if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
    return `# ${file.name}\n\n\`\`\`\n${content}\n\`\`\``;
  }

  // For CSV files, use AI to intelligently convert to markdown
  const systemPrompt = `You are an expert at analyzing and converting pricing data from CSV files into well-structured markdown tables.

Your task is to:
1. Analyze the CSV data to understand its structure (pricing sheets, rate tables, etc.)
2. Identify headers, pricing tiers, date ranges, room types, or any other relevant categories
3. Convert it into clean, readable markdown tables
4. Preserve ALL information from the original data
5. Group related data logically if there are multiple tables
6. Add section headers to explain what each table represents
7. Format currency values consistently
8. Handle any special pricing rules or notes in the data

IMPORTANT: Return ONLY the markdown output, no explanations or additional text.`;

  const userMessage = `Convert this CSV pricing data into well-structured markdown tables:

Filename: ${file.name}

CSV Content:
${content}`;

  try {
    // Use GPT-4 for better understanding of complex pricing structures
    const markdown = await callOpenAIWithHistory(
      systemPrompt, 
      [{ role: "user", content: userMessage }],
      { 
        model: "gpt-4o", // Using GPT-4 for better comprehension
        temperature: 0.1  // Lower temperature for more consistent formatting
      }
    );

    // Add file header
    return `# ${file.name}\n\n${markdown}`;
  } catch (error) {
    console.error("Error converting document with AI:", error);
    // Fallback to basic conversion
    return basicCSVToMarkdown(file.name, content);
  }
}

function basicCSVToMarkdown(filename: string, content: string): string {
  let markdown = `# ${filename}\n\n`;
  
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length > 0) {
    // Parse CSV properly handling quoted values
    const parseCSVLine = (line: string) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };
    
    const headers = parseCSVLine(lines[0]);
    markdown += '| ' + headers.join(' | ') + ' |\n';
    markdown += '|' + headers.map(() => ' --- ').join('|') + '|\n';
    
    for (let i = 1; i < lines.length; i++) {
      const cells = parseCSVLine(lines[i]);
      if (cells.length === headers.length) {
        markdown += '| ' + cells.join(' | ') + ' |\n';
      }
    }
  }
  
  return markdown;
}