"use client";

import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

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
            <div className="flex gap-4">
                <button className="px-6 py-2 text-white hover:text-purple-300 transition">
                    About
                </button>
                <button className="px-6 py-2 text-white hover:text-purple-300 transition">
                    Documentation
                </button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Login
                </button>
            </div>
        );
    }

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-2 text-white text-2xl font-bold">
                    <Code2 className="w-8 h-8" />
                    <span>NeoCodyr</span>
                </div>
                
                {navBarSelection()}

            </nav>
        </>
    );
}

export default Navbar;