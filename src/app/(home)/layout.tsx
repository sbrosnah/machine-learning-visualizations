'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/components/logo';
import { MainNavOpenContext, MarkdownNavOpenContext } from '@/lib/contexts';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isMarkdownNavOpen, setIsMarkdownNavOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
        if (isMarkdownNavOpen) { setIsMarkdownNavOpen(false) }
        console.log("mainNav:", isSideNavOpen)
        console.log("markdownNav:", isMarkdownNavOpen)
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const links = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/about",
            name: "About"
        },
        {
            path: "/contact",
            name: "Contact"
        }
    ]

    return (
        <MainNavOpenContext.Provider value={{ value: isSideNavOpen, setValue: setIsSideNavOpen }}>
            <MarkdownNavOpenContext.Provider value={{ value: isMarkdownNavOpen, setValue: setIsMarkdownNavOpen}}>
                <div className={isDarkMode ? "dark" : ""}>
                    <div className={`fixed top-0 left-0 z-[60] flex w-full h-16 p-6 px-12 justify-between items-center bg-gray-200 
                        ${isSideNavOpen || isMarkdownNavOpen ? "shadow-[0_0_15px_0_rgb(120,113,108),_0_0_6px_0_rgb(120,113,108)]" : 
                        "shadow-[0_0_15px_0_rgb(156,163,175),_0_0_6px_0_rgb(156,163,175)]"}`}>

                        <div className='flex w-max'>
                            <button onClick={toggleSideNav} className='transition-transform duration-200 transform hover:scale-125 mr-8'>
                                {isSideNavOpen ? <MenuOpenRoundedIcon className="text-blue-400" fontSize='large'/> : <MenuRoundedIcon className="text-blue-400" fontSize='large'/>}
                            </button>
                            <Logo width={40} height={40} className="text-blue-400 transition-transform duration-200 transform hover:scale-125"></Logo> 
                        </div>
                        <div className='flex w-max'>
                            <a href="https://github.com/sbrosnah" target="_blank" rel="noopener noreferrer" className='transition-transform duration-200 transform hover:scale-125'>
                                <FaGithub  size={32} className='mr-4 text-blue-400'/>
                            </a>
                            <a href="https://linkedin.com/in/spencer-brosnahan" target="_blank" rel="noopener noreferrer" className='transition-transform duration-200 transform hover:scale-125'>
                                <FaLinkedin size={32} className='mr-4 text-blue-400'/>
                            </a>
                            <button onClick={toggleTheme} className='transition-transform duration-200 transform hover:scale-125'>
                                {isDarkMode ? <DarkModeOutlinedIcon fontSize='large' className='text-blue-400'/> : <LightModeOutlinedIcon fontSize='large' className='text-blue-400' />}
                            </button>
                        </div>
                    </div>

                    <nav className={clsx("fixed z-50 lg:h-[calc(100%-3.5rem)] h-max lg:w-64 w-full lg:top-16 bg-gray-200 transition-all duration-300", {
                        "top-[calc(-100%+3.5rem)] lg:-left-64": !isSideNavOpen,
                        "top-16 lg:left-0 shadow-[0_0_15px_0_rgb(0,0,0,.3),_0_0_6px_0_rgb(0,0,0,.3)]": isSideNavOpen
                    })}>

                        <ul className="list-none p-0 text-center lg:text-left bg-white h-full">
                            {links.map((link, index) => (
                                <li key={index} className="flex w-full h-max justify-center lg:justify-start border-b-2 border-gray-300">
                                    <span className='my-4 lg:ml-12 text-gray transition-transform duration-200 transform hover:scale-125'>
                                        <Link href={link.path}>{link.name}</Link>
                                    </span>
                                </li>  
                            ))}
                        </ul>
                    </nav>

                    <div className={`fixed top-0 left-0 min-h-screen h-full w-full bg-black bg-opacity-50 z-40 ${isSideNavOpen ? "block" : "hidden"}`} onClick={toggleSideNav}></div>

                    <div className='flex justify-end w-full h-full'>
                        <main className={clsx('h-max w-full transition-all duration-300 pt-20', {
                            "lg:w-[calc(100%-20rem)]": isSideNavOpen,
                            "lg:w-full": !isSideNavOpen
                        })}>
                            {children}
                        </main>
                    </div>
                </div>

            </MarkdownNavOpenContext.Provider>
        </MainNavOpenContext.Provider>

    );
}