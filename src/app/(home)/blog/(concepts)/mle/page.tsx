import { getMarkdownContent } from '@/lib/server-side-utils';
import MLEClientPage from "@/app/(home)/blog/(concepts)/mle/clientPage";

export default function MLEPage() {

    const content = getMarkdownContent('mle');

    return (
        <MLEClientPage content={content} />
    );
}