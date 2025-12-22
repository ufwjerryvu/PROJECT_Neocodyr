import React from 'react';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';

const mockLessons = [
    {
        id: 1,
        title: 'Introduction to Variables',
        studentsEnrolled: 12,
        updatedAt: '2 days ago',
    },
    {
        id: 2,
        title: 'Control Flow and Loops',
        studentsEnrolled: 8,
        updatedAt: '5 days ago',
    },
    {
        id: 3,
        title: 'Functions and Scope',
        studentsEnrolled: 15,
        updatedAt: '1 week ago',
    },
    {
        id: 4,
        title: 'Pointers and Memory',
        studentsEnrolled: 6,
        updatedAt: '2 weeks ago',
    },
];

const LessonCard = ({ lesson }: { lesson: typeof mockLessons[0] }) => {
    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-300 font-semibold">{lesson.id}</span>
                    </div>
                    <div>
                        <h3 className="text-slate-100 font-medium">{lesson.title}</h3>
                        <p className="text-slate-400 text-sm">
                            {lesson.studentsEnrolled} students enrolled • Updated {lesson.updatedAt}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                        <Edit2 className="w-4 h-4 text-purple-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const LessonsSection = () => {
    return (
        <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                        Lessons
                    </h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Lesson
                    </button>
                </div>

                <div className="space-y-3">
                    {mockLessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LessonsSection;
