import { Type, Settings, Edit2, BookOpen, Code, Trash2, Check, X, Lock, Unlock, Clock, AlertCircle, GraduationCap, ArrowLeft } from 'lucide-react';

const LessonAuthorManagePageContent = () => {
    return (
        <div className="min-h-screen">
            {/* Main Content */}
            <main className="px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header section */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                            <BookOpen className="w-4 h-4 text-purple-300" />
                            <span className="text-sm font-medium text-purple-300">Lesson Management</span>
                        </div>

                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <a href="#" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition mb-4">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="text-sm font-medium">Back to Course</span>
                                </a>
                                <h1 className="text-6xl font-bold mb-2 leading-tight">
                                    <span className="block text-slate-100">Manage Lesson</span>
                                </h1>
                                <p className="text-2xl text-slate-400 mb-4"></p>
                                <p className="text-lg text-slate-500">Control your lesson content, settings, and structure</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-medium transition border border-slate-600">
                                    Save Draft
                                </button>
                                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                    Publish Lesson
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-6">
                                <Settings className="w-6 h-6 text-purple-400" />
                                Course
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-slate-400 text-sm flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-purple-400" />
                                        Course Name
                                    </label>
                                    <p className="text-slate-100 text-lg">Introduction to Computer Science</p>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Information */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-6">
                                <Settings className="w-6 h-6 text-purple-400" />
                                Basic Information
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-slate-400 text-sm flex items-center gap-2">
                                            <Type className="w-4 h-4 text-purple-400" />
                                            Lesson Title
                                        </label>
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    </div>
                                    <p className="text-slate-100 text-lg">Linked Lists & Pointers</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-slate-400 text-sm flex items-center gap-2">
                                            <Type className="w-4 h-4 text-purple-400" />
                                            Description
                                        </label>
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    </div>
                                    <p className="text-slate-100 text-lg">
                                        Deep dive into linked lists, covering singly and doubly linked lists, 
                                        pointer manipulation, and common algorithms. Includes practical problems 
                                        to solidify your understanding.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-slate-400 text-sm flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-purple-400" />
                                            Estimated Time (hours)
                                        </label>
                                        <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    </div>
                                    <p className="text-slate-100 text-lg">3 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Content */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
                                <BookOpen className="w-6 h-6 text-purple-400" />
                                Lesson Content
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">
                                Add lectures and problems in any order. Students will progress through them sequentially.
                            </p>

                            <div className="space-y-3 mb-6">
                                {/* Lecture Item */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-500 cursor-move">⋮⋮</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Lecture</div>
                                            <div className="text-slate-100 font-medium">Introduction to Linked Lists</div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Problem Item */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-500 cursor-move">⋮⋮</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Code className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem</div>
                                            <div className="text-slate-100 font-medium">Reverse Linked List</div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Lecture Item */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-500 cursor-move">⋮⋮</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Lecture</div>
                                            <div className="text-slate-100 font-medium">Doubly Linked Lists</div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Problem Item */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-500 cursor-move">⋮⋮</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Code className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem</div>
                                            <div className="text-slate-100 font-medium">Merge Two Sorted Lists</div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Problem Item */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-500 cursor-move">⋮⋮</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Code className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Problem</div>
                                            <div className="text-slate-100 font-medium">Linked List Cycle Detection</div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                            </button>
                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add Content Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 px-6 py-4 bg-slate-900/50 border-2 border-dashed border-slate-600 hover:border-purple-500/50 rounded-lg transition-all flex items-center justify-center gap-3 text-slate-300 hover:text-purple-300">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="font-medium">Add Lecture</span>
                                </button>
                                <button className="flex-1 px-6 py-4 bg-slate-900/50 border-2 border-dashed border-slate-600 hover:border-purple-500/50 rounded-lg transition-all flex items-center justify-center gap-3 text-slate-300 hover:text-purple-300">
                                    <Code className="w-5 h-5" />
                                    <span className="font-medium">Add Problem</span>
                                </button>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-6">
                                <Settings className="w-6 h-6 text-purple-400" />
                                Settings
                            </h2>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked 
                                        className="w-5 h-5 rounded border-slate-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-slate-300">Require sequential completion (students must complete items in order)</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked 
                                        className="w-5 h-5 rounded border-slate-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-slate-300">Lock lesson until previous lesson is completed</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-5 h-5 rounded border-slate-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-slate-300">Allow students to see solutions after first attempt</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Summary Box */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-slate-100 mb-4">Lesson Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Total Items</span>
                                    <span className="text-slate-100 font-semibold">5</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Lectures</span>
                                    <span className="text-slate-100 font-semibold">2</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Problems</span>
                                    <span className="text-slate-100 font-semibold">3</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Est. Time</span>
                                    <span className="text-slate-100 font-semibold">3 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-sm">Status</span>
                                    <span className="text-orange-400 font-semibold">Draft</span>
                                </div>
                            </div>
                        </div>

                        {/* Warning Box */}
                        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                <span>Remember</span>
                            </h3>
                            <p className="text-slate-300 text-sm">
                                Make sure all problems have test scripts before publishing. 
                                Students won't be able to submit without validation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </div>
    );
};

export default LessonAuthorManagePageContent;