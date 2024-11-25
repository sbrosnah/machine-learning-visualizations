import { getMarkdownContent } from '@/lib/utils';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default async function MarkdownPage({ slug }: { slug: string}) {
    const content = await getMarkdownContent(slug)

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <Markdown
                className="prose max-w-none" 
                remarkPlugins={[remarkGfm, remarkMath]} 
                rehypePlugins={[rehypeKatex]}
                components = {{
                    code({ className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                  
                        // if (language === 'mermaid') {
                        //   return <Mermaid chart={String(children)} />;
                        // }
                  
                        if (!className) {
                          return (
                            <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white" {...props}>
                              {children}
                            </code>
                          );
                        }
                  
                        return (
                          <SyntaxHighlighter
                            language={language}
                            style={materialDark}
                            className="rounded-lg !bg-gray-900"
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
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
            }}>
                {content}
            </Markdown>
        </article>

    );
}