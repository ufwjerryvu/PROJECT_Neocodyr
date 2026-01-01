import react from 'react';
import Background from '../../../components/Background';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import LessonAuthorManagePageContent from './Content';

const LessonAuthorManagePage = () => {
    return(
        <>
            <Background>
                <Navbar variant="login"/>
                <LessonAuthorManagePageContent/>
                <Footer/>
            </Background>
        </>
    )
}

export default LessonAuthorManagePage;
