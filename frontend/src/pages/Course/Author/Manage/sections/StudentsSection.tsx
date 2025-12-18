import React from 'react';
import { GraduationCap, UserPlus, Search, Mail, Trash2 } from 'lucide-react';

const mockStudents = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        progress: 60,
        enrolledDate: 'Dec 15, 2025',
        initials: 'JS',
    },
    {
        id: 2,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        progress: 85,
        enrolledDate: 'Dec 10, 2025',
        initials: 'ED',
    },
    {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        progress: 42,
        enrolledDate: 'Dec 8, 2025',
        initials: 'RJ',
    },
    {
        id: 4,
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        progress: 93,
        enrolledDate: 'Dec 5, 2025',
        initials: 'MG',
    },
];

const StudentRow = ({ student }: { student: typeof mockStudents[0] }) => {
    return (
        <tr className="border-b border-slate-700/50 hover:bg-slate-900/30 transition-colors">
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.initials}
                    </div>
                    <span className="text-slate-100 font-medium">{student.name}</span>
                </div>
            </td>
            <td className="py-4 px-4 text-slate-300">{student.email}</td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden max-w-[100px]">
                        <div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                            style={{ width: `${student.progress}%` }}
                        ></div>
                    </div>
                    <span className="text-slate-300 text-sm">{student.progress}%</span>
                </div>
            </td>
            <td className="py-4 px-4 text-slate-300">{student.enrolledDate}</td>
            <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                        <Mail className="w-4 h-4 text-purple-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                        <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const StudentsSection = () => {
    return (
        <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-purple-400" />
                        Students
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Invite Student
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Name</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Email</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Progress</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Enrolled</th>
                                <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStudents.map((student) => (
                                <StudentRow key={student.id} student={student} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentsSection;
