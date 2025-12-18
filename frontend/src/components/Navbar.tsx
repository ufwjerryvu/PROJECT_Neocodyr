"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Code2, LogOut, Plus, User, Menu, X } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProp {
    variant: string;
}

const Navbar = ({ variant }: NavbarProp) => {
    const [user, setUser,] = useAuth();
    const authButtonText = variant === "login" ? "Register" : "Login";
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userInfo");

        setTimeout(() => {
            navigate("/login");
            setUser(null);
        }, 500);
    }

    return (
        <nav className="relative flex items-center justify-between px-4 md:px-8 py-4 md:py-6 z-50">
            {/* Left section: Logo */}
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-xl md:text-2xl font-bold flex-shrink-0">
                <Code2 className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                    NeoCodyr
                </span>
            </button>

            {/* Right section */}
            {user ? (
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        {user?.role.toLowerCase() === "author" &&
                            <button
                                onClick={() => navigate("/author/course/create")}
                                className="flex items-center justify-center h-10 w-10 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        }
                        <button onClick={() => navigate("/")}
                            className="cursor-pointer h-10 px-6 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            Explore
                        </button>
                        <button onClick={() => navigate("/dashboard")}
                            className="cursor-pointer h-10 px-6 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            Dashboard
                        </button>
                    </div>
                    <button className="cursor-pointer flex items-center justify-center h-10 w-10 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <Bell className="w-5 h-5" />
                    </button>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="cursor-pointer flex items-center justify-center h-10 w-10 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        >
                            <User className="w-5 h-5" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-purple-500/30 rounded-lg shadow-2xl shadow-purple-900/50 overflow-hidden z-[100]">
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition flex items-center gap-3"
                                >
                                    <User className="w-4 h-4" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 transition flex items-center gap-3"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center justify-center h-10 w-10 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        <button className="cursor-pointer h-10 px-6 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            About
                        </button>
                        <button className="cursor-pointer h-10 px-6 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            Documentation
                        </button>
                        <button onClick={() => {
                            if (variant === "login") {
                                navigate("/register")
                            } else {
                                navigate("/login");
                            }
                        }}
                            className="cursor-pointer h-10 px-6 flex items-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-lg shadow-purple-900/50 hover:shadow-purple-700/70">
                            {authButtonText}
                        </button>
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center justify-center h-10 w-10 text-purple-300 hover:text-purple-200 transition"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            )}

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-900 border-t border-purple-500/30 md:hidden">
                    <div className="flex flex-col p-4 gap-3">
                        {user ? (
                            <>
                                <button onClick={() => {
                                    navigate("/");
                                    setIsMobileMenuOpen(false);
                                }}
                                    className="cursor-pointer px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10">
                                    Explore
                                </button>
                                <button onClick={() => {
                                    navigate("/dashboard");
                                    setIsMobileMenuOpen(false);
                                }}
                                    className="cursor-pointer px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10">
                                    Dashboard
                                </button>
                                {user?.role.toLowerCase() === "author" &&
                                    <button
                                        onClick={() => {
                                            navigate("/author/course/create");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center gap-2 px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Create
                                    </button>
                                }
                            </>
                        ) : (
                            <>
                                <button className="cursor-pointer px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10">
                                    About
                                </button>
                                <button className="cursor-pointer px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10">
                                    Documentation
                                </button>
                                <button onClick={() => {
                                    if (variant === "login") {
                                        navigate("/register")
                                    } else {
                                        navigate("/login");
                                    }
                                    setIsMobileMenuOpen(false);
                                }}
                                    className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-lg">
                                    {authButtonText}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;