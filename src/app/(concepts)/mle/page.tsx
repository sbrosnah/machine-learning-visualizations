import MarkdownPage from "@/app/components/MarkdownPage";
import CoinFlip from "@/app/components/mle/CoinFlip";
import { MARKDOWN_DELIMITER } from "@/lib/constants";
import { getMarkdownContent } from '@/lib/markdown-utils';
import Image from 'next/image'


export default async function MLEPage() {
    const content = await getMarkdownContent('mle')

    const chunks = content.split(MARKDOWN_DELIMITER);

    return (
        <>
            <MarkdownPage content={chunks[0]}/>
            <CoinFlip/>
            <MarkdownPage content={chunks[1]}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/log-odds.png" alt="MLE Diagram" width={1000} height={1000}/>
            <MarkdownPage content={chunks[2]}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/normal-pdf.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownPage content={chunks[3]}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/jensen's-inequality.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownPage content={chunks[4]}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/negated-log.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownPage content={chunks[5]}/> 
        </>
    );
}