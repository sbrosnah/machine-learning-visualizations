import MarkdownPage from "@/app/components/MarkdownPage";
import { getMarkdownContent } from "@/lib/markdown-utils";

export default async function KMeansPage() {
    const content = await getMarkdownContent('k-means')
    return (
        <MarkdownPage content={content}/>
    );
}