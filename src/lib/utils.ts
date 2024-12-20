import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

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
    let text = match[2].trim(); // Extract the heading text
    //take of a colon at the end if needed
    if(text.endsWith(":")) {
      text = text.slice(0, -1)
    }
    const id = generateId(text)
    headings.push({ level, text, id });
  }

  return headings;
}




