"use client";

import React, { useState } from 'react';
import { Bell, Code2, LogOut, Rocket, User } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProp {
    variant: string;
}

const Navbar = ({ variant }: NavbarProp) => {
    const [user] = useAuth();
    const authButtonText = variant === "login" ? "Register" : "Login";
    const navigate = useNavigate();

    const navbarSelection = () => {
        if (user) {
            return authenticatedNavbar();
        }

        return unauthenticatedNavbar();
    }

    const unauthenticatedNavbar = () => {
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
                    <button onClick={() => {
                        if (variant === "login") {
                            /* Since we're in the login page and the button is 'Register' */
                            navigate("/register")
                        } else {
                            /* Since we're in the register page and the button is 'Login' */
                            navigate("/login");
                        }
                    }}
                        className="cursor-pointer px-6 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/50 hover:shadow-purple-700/70">
                        {authButtonText}
                    </button>
                </div>
            </>
        );
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const authenticatedNavbar = () => {

        return (
            <>
                <div className="flex items-center gap-3 text-2xl font-bold">
                </div>
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer px-6 py-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        Dashboard
                    </button>
                    <button className="cursor-pointer p-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="cursor-pointer p-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-purple-500/40 rounded-lg shadow-2xl shadow-purple-900/50 overflow-hidden z-50">
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-slate-200 hover:bg-purple-500/20 transition flex items-center gap-3"
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        // Your logout logic here
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-slate-200 hover:bg-purple-500/20 transition flex items-center gap-3"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center gap-2 text-white text-2xl font-bold">
                    <Code2 className="w-8 h-8 text-purple-400" />
                    <button onClick={() => navigate("/")}>
                        <span>NeoCodyr</span>
                    </button>
                </div>

                {navbarSelection()}

            </nav>
        </>
    );
}

export default Navbar;