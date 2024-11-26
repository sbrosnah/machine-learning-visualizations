import fs from 'fs';
import path from 'path';

const markdownDirectory = path.join(process.cwd(), 'markdown'); // Adjust to your directory

export function getMarkdownContent(fileName: string) {
  const fullPath = path.join(markdownDirectory, `${fileName}.md`);
  return fs.readFileSync(fullPath, 'utf-8');
}
