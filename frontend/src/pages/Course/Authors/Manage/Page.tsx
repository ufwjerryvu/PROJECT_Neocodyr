import React from 'react';

import Background from '../../../../components/Background';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import AuthorManageCoursePageContent from './Content';

export const AuthorManageCoursePage = () => {
    return(
        <Background>
            <Navbar variant={"landing"}/>
            <AuthorManageCoursePageContent/>
            <Footer/>
        </Background>
    );
}