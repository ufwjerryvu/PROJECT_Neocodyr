"use client";

import React, { useState } from 'react';
import { Code2, Rocket } from 'lucide-react';

interface NavbarProp {
    variant: string;
}

const Navbar = ({ variant }: NavbarProp) => {
    const navBarSelection = () => {
        if (variant === "landing") {
            return landingNavbar();
        } else if (variant === "dashboard") {
            // pass
        } else if (variant === "login" || variant === "register") {
            // pass
        }
    }

    const landingNavbar = () => {
        return (
            <>
                <div className="flex items-center gap-3 text-2xl font-bold">
                </div>
                <div className="flex gap-4">
                    <button className="cursor-pointer px-6 py-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        About
                    </button>
                    <button className="cursor-pointer px-6 py-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        Documentation
                    </button>
                    <button className="cursor-pointer px-6 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/50 hover:shadow-purple-700/70">
                        Login
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-2 text-white text-2xl font-bold">
                    <Code2 className="w-8 h-8 text-purple-400" />
                    <span>NeoCodyr</span>
                </div>

                {navBarSelection()}

            </nav>
        </>
    );
}

export default Navbar;