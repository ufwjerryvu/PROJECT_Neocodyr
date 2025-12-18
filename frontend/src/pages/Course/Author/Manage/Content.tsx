import React from 'react';
import { BookOpen, UserPlus } from 'lucide-react';
import CourseSettingsSection from './sections/CourseSettingsSection';
import LessonsSection from './sections/LessonsSection';
import StudentsSection from './sections/StudentsSection';
import InstructorsSection from './sections/InstructorsSection';

const AuthorManageCoursePageContent = () => {
    return (
        <>
            <main className="px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header section */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                            <BookOpen className="w-4 h-4 text-purple-300" />
                            <span className="text-sm font-medium text-purple-300">Course Management</span>
                        </div>

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-6xl font-bold mb-2 leading-tight">
                                    <span className="block text-slate-100">Manage Course</span>
                                </h1>
                                <p className="text-2xl text-slate-400 mb-4"></p>
                                <p className="text-lg text-slate-500">Control your course content, students, and instructors</p>
                            </div>
                        </div>
                    </div>

                    <CourseSettingsSection />
                    <LessonsSection />
                    <StudentsSection />
                    <InstructorsSection />
                </div>
            </main>
        </>
    );
};

export default AuthorManageCoursePageContent;