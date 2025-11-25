import React from 'react';

import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LandingPageContent from './Content';

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