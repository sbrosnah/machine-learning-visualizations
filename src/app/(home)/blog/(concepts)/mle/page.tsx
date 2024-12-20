import { getMarkdownContent } from '@/lib/markdown-utils';
import MLEClientPage from "./clientPage";

export default function MLEPage() {

    const content = getMarkdownContent('mle');

    return (
        <MLEClientPage content={content} />
    );
}