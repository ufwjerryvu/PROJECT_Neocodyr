import React from 'react';
import { BookOpen, Plus, Edit2, Trash2, UserPlus, Users, GraduationCap, Mail, Search, MoreVertical } from 'lucide-react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Footer from './components/Footer';

export const TestPage = () => {
    return (
        <>
            <Background>
                <Navbar variant="login"/>
                
                <Footer/>
            </Background>
        </>
    );
};