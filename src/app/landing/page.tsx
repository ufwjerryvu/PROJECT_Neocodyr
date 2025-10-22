"use client";

import React from 'react';

import Background from '../_components/background';
import Navbar from '../_components/navbar';
import LandingPageContent from './content';
import Footer from '../_components/footer';

const LandingPage = () => {
    return(
        <Background>
            <Navbar variant={"landing"}/>
            <LandingPageContent/>
            <Footer/>
        </Background>
    );
}

export default LandingPage;