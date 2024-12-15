import fs from 'fs';
import path from 'path';
import { generateId } from '@/lib/utils';

const markdownDirectory = path.join(process.cwd(), 'markdown'); // Adjust to your directory

export function getMarkdownContent(fileName: string) {
  const fullPath = path.join(markdownDirectory, `${fileName}.md`);
  return fs.readFileSync(fullPath, 'utf-8');
}

export function parseMarkdownHeadings(content: string) {
  // Regex explanation:
  // ^ - Start of the line
  // (#+) - Match one or more `#` symbols and capture them
  // \s - Match a single space
  // (.+) - Match the rest of the line (heading text) and capture it
  // /gm - Global and multiline flags to process the entire content
  const headingRegex = /^(#+)\s(.+)$/gm;

  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Number of `#` defines the heading level
    const text = match[2].trim(); // Extract the heading text
    const id = generateId(text)
    headings.push({ level, text, id });
  }

  return headings;
}
