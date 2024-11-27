import MarkdownPage from "@/app/components/MarkdownPage";
import MLEVisualization from "@/app/components/MLEVisualization";
import { MARKDOWN_DELIMITER } from "@/lib/constants";
import { getMarkdownContent } from '@/lib/markdown-utils';


export default async function MLEPage() {
    const content = await getMarkdownContent('mle')

    const chunks = content.split(MARKDOWN_DELIMITER);

    return (
        <>
            <MarkdownPage content={chunks[0]}/>
            <MLEVisualization/>
            <MarkdownPage content={chunks[1]}/> 
        </>
    );
}