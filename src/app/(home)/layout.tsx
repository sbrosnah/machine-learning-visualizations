'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (

        <div className={clsx('h-full w-full', {'dark': isDarkMode})}>
            <div className="fixed z-10 flex w-full h-14 p-6 px-12 justify-between items-center bg-white">
                <div className='flex w-max'>
                    <button onClick={toggleSideNav}>
                        <MenuRoundedIcon fontSize='large'/>
                    </button>
                    
                </div>
                <div className='flex w-max'>
                    <a href="https://github.com/sbrosnah" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={32} className='mr-4'/>
                    </a>
                    <a href="https://linkedin.com/in/spencer-brosnahan" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={32} className='mr-4'/>
                    </a>
                    <button onClick={toggleTheme}>
                        {isDarkMode ? <DarkModeOutlinedIcon fontSize='large'/> : <LightModeOutlinedIcon fontSize='large' />}
                    </button>
                </div>
            </div>
            <div className='flex flex-row w-full h-full'>
                <nav className={clsx("fixed z-12 h-[calc(100%-3.5rem)] w-64 top-14 transition-transform duration-300", {
                    "-translate-x-64": !isSideNavOpen,
                    "translate-x-0": isSideNavOpen
                })}>

                    <ul className="list-none p-0">
                        <li className="m-4 ml-12"><Link href="/">Home</Link></li>
                        <li className="m-4 ml-12"><Link href="/about">About</Link></li>
                        <li className="m-4 ml-12"><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>

                
                <main className={clsx('z-0 h-max transition-all duration-300 pt-20', {
                    "translate-x-64 w-[calc(100%-16rem)]": isSideNavOpen,
                    "w-full": !isSideNavOpen
                })}>
                    {isSideNavOpen && <div className="fixed top-0 left-0 min-h-screen h-full w-full bg-black bg-opacity-50 z-10" onClick={toggleSideNav}></div>}
                    {children}
                </main>
            </div>
        </div>
    );
}