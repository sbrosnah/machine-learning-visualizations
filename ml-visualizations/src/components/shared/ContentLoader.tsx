import { useEffect, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { components } from '@/components/mdx/components'

export interface ContentLoaderProps {
    contentType: 'mle' | 'kmeans'
  }

export default function ContentLoader({ contentType }: ContentLoaderProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/${contentType}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const serializedContent = await serialize(data.content, {
          mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          }
        })
        setMdxSource(serializedContent)
      } catch (err) {
        console.error('Error fetching content:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    fetchContent()
  }, [contentType])

  if (error) {
    return <div className="text-red-500">Error loading content: {error}</div>
  }

  if (!mdxSource) {
    return <div>Loading...</div>
  }

  return (
    <div className="prose prose-slate max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}
