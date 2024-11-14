'use client'
import { useEffect, useState } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

export default function DynamicMDXContent({ content }: { content: string }) {

  //TODO: Add some delimiter to split the string into an array of strings and then rendr the 
  //separate strings into different components.
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkMath,
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          [rehypeAutolinkHeadings, {
            behavior: 'append',
            properties: { className: ['anchor'] }
          }],
          [rehypeExternalLinks, {
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer']
          }]
        ],
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