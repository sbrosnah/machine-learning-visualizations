'use client'

import MarkdownContent from "@/app/components/MarkdownContent";
import MarkdownLinks from "@/app/components/MarkdownLinks";
import CoinFlip from "@/app/components/mle/CoinFlip";
import { MARKDOWN_DELIMITER } from "@/lib/constants";
import { RefsMap } from "@/lib/types";
import { parseMarkdownHeadings } from "@/lib/utils";
import { debounce } from "@mui/material";
import Image from "next/image";
import { createRef, useCallback, useEffect, useState } from "react";

export default function MLEClientPage({ content}: { content: string} ) {

    const [activeSection, setActiveSection] = useState("")

    const markdownChunks = content.split(MARKDOWN_DELIMITER);
    const headers = parseMarkdownHeadings(content)

    const refs: RefsMap = {}

    headers.forEach(header => {
        refs[header.id] = createRef();
    })

    useEffect(() => {
        const handleScroll = debounce(() => {

            const threshold = window.innerHeight * .25;

            //Find the element greater than and closest to the scroll position
            let closestDist = Infinity;
            let closestKey = ''
            Object.keys(refs).forEach(key => {
                let elPos = refs[key].current?.getBoundingClientRect().y

                //Get the element that is the closest to the top of the screen and is above the halfway mark of the viewport
                if(elPos && elPos <= threshold && Math.abs(elPos - threshold) < closestDist) {
                    closestDist = Math.abs(elPos - threshold);
                    closestKey = key;
                }
                
            })

            // setActiveSection(closestKey)
            // console.log("active section:", activeSection)
            console.log("closes:", closestKey)

        }, 50); // Adjust debounce time as needed

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    

    // useEffect(() => {

    //     Object.keys(refs).forEach(key => {
    //         const observer = new IntersectionObserver((entries) => {
    //             entries.forEach(entry => {
    //                 console.log(entry)
    //             });
    //         }, {
    //         threshold: 0, // Trigger when the element is visible at any part.
    //         })
    //         const ref = refs[key].current
    //         if(ref) { observer.observe(ref) }
    //     })

    // }, [])


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
            
            <MarkdownLinks headers={headers}/>
        </>

    );
}