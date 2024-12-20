'use client'

import Link from "next/link";
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import { useState } from "react";
import clsx from "clsx";

export default function MarkdownLinks({ headers }: {headers: { level: number, text: string, id: string }[]}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const closeSideNav = () => {
        setIsSideNavOpen(false);
    }
    
    return (
        <>
            <div onClick={toggleSideNav} className="fixed z-30 bottom-10 right-10 p-1 rounded-full bg-blue-400 lg:hidden transition-transform duration-200 transform hover:scale-125 shadow-lg shadow-gray-400">
                <TocRoundedIcon fontSize='large' className="text-gray-200"/>
            </div>

            <div className={`fixed top-0 left-0 min-h-screen h-full w-full bg-black bg-opacity-50 z-10 ${isSideNavOpen ? "block" : "hidden"}`} onClick={toggleSideNav}></div>
            
            <nav className={clsx("z-20 block pb-14 overflow-y-auto fixed h-[calc(100%-4rem)] pl-4 w-[20rem] top-16 lg:right-0 bg-white transition-all duration-300", {
                "right-0": isSideNavOpen,
                "right-[-100%]": !isSideNavOpen
            })}>
                <Link href="/blog" className="text-blue-400 hover:text-blue-500 text-lg">
                    <p className="pb-2 pt-2">← Back to Dashboard</p>
                </Link>
                {headers.map((item, index) => {
                    return <Link key={index} href={`/blog/mle#${item.id}`} className="text-blue-400 hover:text-blue-500">
                        <p onClick={closeSideNav} className={`p-1 pr-4 text-sm pl-${item.level}`}>{item.text}</p>
                    </Link>
                })}

            </nav>
        </>

    );
}