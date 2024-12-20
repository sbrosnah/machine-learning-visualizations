'use client'

import MarkdownContent from "@/app/components/MarkdownContent";
import MarkdownLinks from "@/app/components/MarkdownLinks";
import CoinFlip from "@/app/components/mle/CoinFlip";
import { MARKDOWN_DELIMITER } from "@/lib/constants";
import { RefsMap } from "@/lib/types";
import { parseMarkdownHeadings } from "@/lib/utils";
import Image from "next/image";
import { createRef, useEffect, useRef, useState } from "react";

export default function MLEClientPage({ content}: { content: string} ) {

    const [activeSection, setActiveSection] = useState("")
    const skip = useRef(false);

    const markdownChunks = content.split(MARKDOWN_DELIMITER);
    const headers = parseMarkdownHeadings(content)

    const refs: RefsMap = {}
    

    headers.forEach(header => {
        refs[header.id] = createRef();
    })


    const handleLinkClick = (id: string) => {
        skip.current = true;
        setActiveSection(id);
    }

    const handleLinkNavOpen = (open: boolean) => {
        //TODO: Pass this up

    }

    useEffect(() => {
        const handleScroll = () => {
            
            if(skip.current) {
                return;
            }

            const threshold = window.innerHeight * .1;

            //TODO: Find a more efficient way to do this
            let closestDist = Infinity;
            let closestKey = ''
            for (const key of Object.keys(refs)) {
                let elPos = refs[key].current?.getBoundingClientRect().y

                if(!elPos){
                    break
                }

                const dist = Math.abs(elPos - threshold)
                if(dist < closestDist) {
                    closestDist = dist;
                    closestKey = key;
                }
                
            }

            setActiveSection(closestKey)
            

        }; 

        handleScroll();

        if (skip.current) {
            skip.current = false;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);


    return (
        <>
            <MarkdownContent content={markdownChunks[0]} refObjects={refs}/>
            <CoinFlip/>
            <MarkdownContent content={markdownChunks[1]} refObjects={refs}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/log-odds.png" alt="MLE Diagram" width={1000} height={1000}/>
            <MarkdownContent content={markdownChunks[2]} refObjects={refs}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/normal-pdf.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownContent content={markdownChunks[3]} refObjects={refs}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/jensen's-inequality.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownContent content={markdownChunks[4]} refObjects={refs}/> 
            <Image className="max-w-5xl mx-auto px-4 py-8 w-full h-auto" src="/images/negated-log.png" alt="Gaussian Plot" width={700} height={500}/>
            <MarkdownContent content={markdownChunks[5]} refObjects={refs}/> 
            
            <MarkdownLinks headers={headers} activeSection={activeSection} onLinkClick={handleLinkClick}/>
        </>

    );
}