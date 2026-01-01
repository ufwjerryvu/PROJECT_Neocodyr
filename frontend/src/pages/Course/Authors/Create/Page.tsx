import React from 'react';

import Background from '../../../../components/Background';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import AuthorCreateCoursePageContent from './Content';

export const AuthorCreateCoursePage = () => {
    return(
        <Background>
            <Navbar variant={"landing"}/>
            <AuthorCreateCoursePageContent/>
            <Footer/>
        </Background>
    );
}