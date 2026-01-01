import React from 'react';
import { Users, Plus, MoreVertical, Trash2 } from 'lucide-react';

const mockInstructors = [
    {
        id: 1,
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        role: 'Lead Instructor',
        initials: 'AB',
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        role: 'Teaching Assistant',
        initials: 'MC',
    },
    {
        id: 3,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'Co-Instructor',
        initials: 'SW',
    },
];

const InstructorCard = ({ instructor }: { instructor: typeof mockInstructors[0] }) => {
    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {instructor.initials}
                    </div>
                    <div>
                        <h3 className="text-slate-100 font-medium">{instructor.name}</h3>
                        <p className="text-slate-400 text-sm">{instructor.role}</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
            </div>
            <p className="text-slate-300 text-sm mb-4">{instructor.email}</p>
            <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition text-sm">
                    Message
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                    <Trash2 className="w-4 h-4 text-red-400" />
                </button>
            </div>
        </div>
    );
};

const InstructorsSection = () => {
    return (
        <div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <Users className="w-6 h-6 text-purple-400" />
                        Instructors
                    </h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Instructor
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockInstructors.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorsSection;
