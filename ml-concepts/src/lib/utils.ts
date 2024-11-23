import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import fs from 'fs';
import path from 'path';

const markdownDirectory = path.join(process.cwd(), 'markdown'); // Adjust to your directory

export function getMarkdownContent(fileName: string) {
  const fullPath = path.join(markdownDirectory, `${fileName}.md`);
  return fs.readFileSync(fullPath, 'utf-8');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


