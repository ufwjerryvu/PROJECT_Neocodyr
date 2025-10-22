"use client";

import React from 'react';

interface BackgroundProp{
    children: React.ReactNode;
};

const Background = ({children} : BackgroundProp) => {
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {children}
        </div>
    )
}

export default Background;