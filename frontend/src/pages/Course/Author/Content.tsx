import React, { useState } from 'react';
import { BookOpen, Plus, X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const AuthorCreateCoursePageContent = () => {
    const [user] = useAuth();

    return (
        <main className="px-8 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header section */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <BookOpen className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-300">Author Dashboard</span>
                    </div>

                    <h1 className="text-6xl font-bold mb-4 leading-tight">
                        <span className="block text-slate-100">Create Course</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed italic font-light tracking-wide">
                        "Teaching is the one profession that creates all other professions."
                        <span className="block mt-2 text-sm md:text-base text-slate-400 not-italic">
                            — Unknown
                        </span>
                    </p>
                </div>

                {/* Form section */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                    <form className="space-y-8">
                        {/* Course title input */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Systems Programming"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Description textarea */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe what students will learn..."
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        {/* Course access type buttons */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Access
                            </label>
                            <div className="flex gap-3">
                                {['Explorable', 'Invite-Only'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:border-purple-500/50 transition-all"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Thumbnail upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Thumbnail
                            </label>
                            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-500/50 transition-all cursor-pointer">
                                <Plus className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                <p className="text-slate-400 text-sm">Click to upload or drag and drop</p>
                                <p className="text-slate-500 text-xs mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                            >
                                Create Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AuthorCreateCoursePageContent;