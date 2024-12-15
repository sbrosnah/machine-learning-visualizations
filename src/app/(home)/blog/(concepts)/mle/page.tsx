import MarkdownContent from "@/app/components/MarkdownContent";
import CoinFlip from "@/app/components/mle/CoinFlip";
import { MARKDOWN_DELIMITER } from "@/lib/constants";
import { getMarkdownContent, parseMarkdownHeadings } from '@/lib/markdown-utils';
import Image from 'next/image'
import Link from "next/link";


export default async function MLEPage() {
    const content = getMarkdownContent('mle')

    const markdownChunks = content.split(MARKDOWN_DELIMITER);
    const headers = parseMarkdownHeadings(content)
    console.log(headers)

    return (
        <>
            <div className="flex w-full h-full flex-col">
                <MarkdownContent content={markdownChunks[0]}/>
                <CoinFlip/>
                <MarkdownContent content={markdownChunks[1]}/> 
                <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/log-odds.png" alt="MLE Diagram" width={1000} height={1000}/>
                <MarkdownContent content={markdownChunks[2]}/> 
                <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/normal-pdf.png" alt="Gaussian Plot" width={700} height={500}/>
                <MarkdownContent content={markdownChunks[3]}/> 
                <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/jensen's-inequality.png" alt="Gaussian Plot" width={700} height={500}/>
                <MarkdownContent content={markdownChunks[4]}/> 
                <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/negated-log.png" alt="Gaussian Plot" width={700} height={500}/>
                <MarkdownContent content={markdownChunks[5]}/> 
            </div>
            {/* TODO: Make this nav it's own component */}
            <nav className="fixed h-[calc(100%-3.5rem)] w-64 top-14 right-0 top-0 z-64">
                <Link href="/blog" className="text-blue-500 hover:text-blue-700">
                    <p className="pb-2">← Back to Dashboard</p>
                </Link>
                {headers.map((item, index) => {
                    return <Link href={`/blog/mle#${item.id}`} className="text-blue-500 hover:text-blue-700">
                        <p className={`pb-2 pr-4 text-sm pl-${item.level}`}>{item.text}</p>
                    </Link>
                })}

            </nav>
        </>

    );
}