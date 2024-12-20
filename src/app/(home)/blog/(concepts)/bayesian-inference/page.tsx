import MarkdownContent from "@/components/markdownContent";
import { getMarkdownContent } from "@/lib/server-side-utils";

export default async function BayesianInferencePage() {
    const content = getMarkdownContent('bayesian-inference')
    return (
        <MarkdownContent content={content} />
    );
}