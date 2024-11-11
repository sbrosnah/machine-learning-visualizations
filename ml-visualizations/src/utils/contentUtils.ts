import fs from 'fs'
import path from 'path'

export function getContent(contentType: 'mle' | 'kmeans') {
  const filePath = path.join(process.cwd(), `src/content/${contentType}-content.mdx`)
  return fs.readFileSync(filePath, 'utf8')
}