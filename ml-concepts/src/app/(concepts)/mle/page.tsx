'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import { useEffect, useState } from 'react';


export default function MLEPage() {

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch('/content/test.md')
        	.then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])


    return (
        <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{markdown}</Markdown>
    );
}