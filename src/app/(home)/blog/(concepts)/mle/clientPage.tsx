'use client'

import MarkdownContent from "@/components/markdownContent";
import MarkdownLinks from "@/components/markdownLinks";
import CoinFlip from "@/components/mle/coinFlip";
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

    useEffect(() => {
        // const handleScroll = () => {
            
        //     if(skip.current) {
        //         return;
        //     }

        //     const threshold = window.innerHeight * .1;

        //     //TODO: Find a more efficient way to do this
        //     let closestDist = Infinity;
        //     let closestKey = ''
        //     for (const key of Object.keys(refs)) {
        //         let elPos = refs[key].current?.getBoundingClientRect().y

        //         if(!elPos){
        //             break
        //         }

        //         const dist = Math.abs(elPos - threshold)
        //         if(dist < closestDist) {
        //             closestDist = dist;
        //             closestKey = key;
        //         }
                
        //     }

        //     setActiveSection(closestKey)
            
        // }; 

        // handleScroll();

        // if (skip.current) {
        //     skip.current = false;
        // }

        const threshold = window.innerHeight * .5;

        type Position = {
            id: string,
            position: number
        }

        //Get positions of all elements
        const positions: Position[] = []
        for (const key of Object.keys(refs)) {
            positions.push({id: key, position: refs[key].current!.getBoundingClientRect().y + window.scrollY})
        }

        type Section = {
            id: string,
            start: number,
            end: number
        }

        //Now define the sections
        const totalHeight = document.documentElement.scrollHeight;
        const sectionBounds: Section[] = []
        for (let i = 0; i < positions.length - 1; i++) {
            const id = positions[i].id
            const start = positions[i].position
            const end = positions[i + 1].position - .01;
            sectionBounds.push({ id: id, start: start, end: end })
        }
        //Handle the final element (or case where there is only 1)
        const final = sectionBounds[sectionBounds.length - 1]
        sectionBounds.push({id: final.id, start: final.start, end: totalHeight })

        //Define a binary search function to find the range we're in
        function binarySearch<T>(
                array: T[], 
                target: T, 
                comparator: (a: T, b: T) => number
                ): number {
            let left = 0;
            let right = array.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const compareResult = comparator(array[mid], target);

                if (compareResult === 0) {
                    return mid; // Found the target
                } else if (compareResult < 0) {
                    left = mid + 1; // Search the right half
                } else {
                    right = mid - 1; // Search the left half
                }
            }

            return -1; // Target not found
        }


        //Define comparator
        function comparator(a: Section, b: Section) {
            
        }



        const handleScroll = () => {
            const viewTop = window.scrollY;
            const viewMid = viewTop + threshold;
            // console.log("scroll", viewMid)
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