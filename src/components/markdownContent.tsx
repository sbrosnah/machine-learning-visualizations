'use client'

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {materialDark, materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw'; //For rendering html in markdown
import { generateId } from '@/lib/utils'
import { RefsMap } from '@/lib/types';
import { LegacyRef } from 'react';

export default function MarkdownContent({ content, refObjects }: { content: string, refObjects: RefsMap}) {

    const scrollMarginTop = '4.5rem'


    return (
        <article className="w-full h-max px-4 py-8">
            
            <Markdown
                className="prose max-w-none" 
                remarkPlugins={[remarkGfm, remarkMath]} 
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components = {{
                    h1({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h1 id={id} ref={ref as LegacyRef<HTMLHeadingElement> } style={{scrollMarginTop: scrollMarginTop}}>{children}</h1>
                    },
                    h2({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h2 id={id} ref={ref as LegacyRef<HTMLHeadingElement>} style={{scrollMarginTop: scrollMarginTop}}>{children}</h2>
                    },
                    h3({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h3 id={id} ref={ref as LegacyRef<HTMLHeadingElement>} style={{scrollMarginTop: scrollMarginTop}}>{children}</h3>
                    },
                    h4({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h4 id={id} ref={ref as LegacyRef<HTMLHeadingElement>} style={{scrollMarginTop: scrollMarginTop}}>{children}</h4>
                    },
                    h5({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h5 id={id} ref={ref as LegacyRef<HTMLHeadingElement>} style={{scrollMarginTop: scrollMarginTop}}>{children}</h5>
                    },
                    h6({ children }) {
                        const text = String(children);
                        const id = generateId(text);
                        const ref = refObjects[id]
                        return <h6 id={id} ref={ref as LegacyRef<HTMLHeadingElement>} style={{scrollMarginTop: scrollMarginTop}}>{children}</h6>
                    },
                    code(props) {
                        const {children, className, node, ...rest} = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={materialDark}
                        />
                        ) : (
                        <code {...rest} className={`${className}`}>
                            {children}
                        </code>
                        )
                    },
                    // Style blockquotes
                    blockquote({ children }) {
                        return (
                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic">
                            {children}
                        </blockquote>
                        );
                    },
                    // Style tables
                    table({ children }) {
                        return (
                        <div className="overflow-x-auto my-8">
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                            {children}
                            </table>
                        </div>
                        );
                    },
                    // Style table headers
                    th({ children }) {
                        return (
                        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-black-500 dark:text-gray-400 uppercase tracking-wider">
                            {children}
                        </th>
                        );
                    },
                    // Style table cells
                    td({ children }) {
                        return (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500 dark:text-gray-400">
                            {children}
                        </td>
                        );
                    },
                    // Style images
                    img({ src, alt }) {
                        return (
                        <img
                            src={src}
                            alt={alt}
                            className="rounded-lg shadow-md max-w-full h-auto my-4"
                        />
                        );
                    }, 
                }}
            >
                {content}
            </Markdown>
        </article>

    );
}