import React, { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, UserPlus, Users, GraduationCap, Mail, Search, MoreVertical } from 'lucide-react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Footer from './components/Footer';
import CreateLessonModal from './pages/Course/Author/Manage/components/CreateLessonModal';

export const TestPage = () => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <Background>
                <Navbar variant="login"/>
                
                <Footer/>
            </Background>
        </>
    );
};