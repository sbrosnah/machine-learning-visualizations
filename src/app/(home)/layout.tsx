'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react';
import clsx from 'clsx';

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
        <div className={clsx('', {'dark': isDarkMode})}>
            <div className="flex w-full h-14 p-6 px-12 justify-between fixed">
                {/* These are the lefticons in the top bar */}
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
            {/* This is everything below the side bar */}
            <div className='flex flex-row'>
                <nav className="fixed top-16 h-full w-48 bg-primary border-red-400 border-8">

                </nav>
                <div className='overflow-auto'>
                    {children}
                </div>
            </div>
            
        </div>

    );
}