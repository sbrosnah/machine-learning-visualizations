

import MarkdownPage from "@/app/components/MarkdownPage";
import MLEVisualization from "@/app/components/MLEVisualization";
import { getMarkdownContent } from '@/lib/markdown-utils';


export default async function MLEPage() {
    const content = await getMarkdownContent('mle')
    //Split the content based off deliminter
    const chunks = content.split("%%%");

    return (
        <>
            <MarkdownPage content={chunks[0]}/>
            <MLEVisualization/>
            <MarkdownPage content={chunks[1]}/>
            
        </>
    );
}