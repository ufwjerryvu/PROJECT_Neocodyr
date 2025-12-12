import React, { useState } from 'react';
import { BookOpen, ChevronRight, Code2, Database, Terminal, Cpu, Brain, Laptop } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import CourseCard from '../../components/CourseCard';

const DashboardPageContent = () => {
    const [user] = useAuth();

    interface CourseCardInfo {
        id: number;
        title: string;
        description: string;
        created_at: string;
    }

    const [courseCards, setCourseCards] = useState<CourseCardInfo[]>([
        { id: 1, title: "Systems Programming", description: "Learn C and multithreading at the same time", created_at: "Today" }
    ]);

    return (
        <main className="px-8 py-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    {/* Welcome back section */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <span className="text-sm font-medium text-purple-300">Welcome back, {user?.first_name}!</span>
                    </div>

                    {/* Dashboard header section */}
                    <h1 className="text-6xl font-bold mb-4 leading-tight">
                        <span className="block text-slate-100">Dashboard</span>
                    </h1>

                    {/* Random quote section */}
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed italic font-light tracking-wide">
                        "The only way to discover the limits of the possible is to go beyond them into the impossible."
                        <span className="block mt-2 text-sm md:text-base text-slate-400 not-italic">
                            — Arthur C. Clarke
                        </span>
                    </p>
                </div>

                {/* Course card mappings section */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseCards.map((course, idx) => {
                        return (
                            <CourseCard
                                key={idx}
                                title={course.title}
                                description={course.description}
                                gradientFrom="from-gray-600"
                                gradientTo="to-slate-600"
                            />
                        )
                    })}
                </div>
            </div>
        </main>
    );
}

export default DashboardPageContent;