import MarkdownPage from "@/app/components/MarkdownPage";
import { getMarkdownContent } from "@/lib/markdown-utils";

export default async function BayesianInferencePage() {
    const content = await getMarkdownContent('bayesian-inference')
    return (
        <MarkdownPage content={content} />
    );
}