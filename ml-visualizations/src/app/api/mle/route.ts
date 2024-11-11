import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/content/mle-content.mdx')
  const content = fs.readFileSync(filePath, 'utf8')
  return NextResponse.json({ content })
}