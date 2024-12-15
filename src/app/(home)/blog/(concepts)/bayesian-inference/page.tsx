import MarkdownContent from "@/app/components/MarkdownContent";
import { getMarkdownContent } from "@/lib/markdown-utils";

export default async function BayesianInferencePage() {
    const content = getMarkdownContent('bayesian-inference')
    return (
        <MarkdownContent content={content} />
    );
}