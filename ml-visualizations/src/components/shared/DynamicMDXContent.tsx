'use client'
import { useEffect, useState } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default function DynamicMDXContent({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      }
    }).then((result) => setMdxSource(result))
  }, [content])

  if (!mdxSource) return null

  return (
    <div className="prose prose-slate max-w-none">
      <MDXRemote {...mdxSource} />
    </div>
  )
}