"use client";

import React, { useState } from 'react';
import { Play, CheckCircle, FileCode, Zap, Terminal } from 'lucide-react';

const LandingPageContent = () => {
    const [showResult, setShowResult] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setShowResult(false);
        setIsRunning(true);
        setTimeout(() => {
            setShowResult(true);
            setIsRunning(false);
        }, 1500);
    }

    return (
        <>
            <main className="px-8 py-20">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-white mb-6">
                        Code. Test. Learn.
                    </h1>
                    <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
                        A powerful code editor built for educators who want to teach their students effectively. Load test cases, run code, and learn.
                    </p>
                    <div className="flex gap-4 justify-center mb-20">
                        <button className="px-8 py-4 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            Launch Editor
                        </button>
                        <button className="px-8 py-4 bg-slate-800 text-white rounded-lg text-lg font-semibold hover:bg-slate-700 transition">
                            View Demo
                        </button>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
                            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-slate-400 text-sm ml-4">lesson.cpp</span>
                                <button 
                                    onClick={() => handleRun()}
                                    disabled={isRunning}
                                    className="ml-auto px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center gap-2 transition"
                                >
                                    <Play className="w-3 h-3" />
                                    {isRunning ? 'Running...' : 'Run'}
                                </button>
                            </div>
                            <div className="p-8 text-left">
                                <pre className="text-green-400 font-mono text-sm">
<code>{`int twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`}</code>
                                </pre>
                            </div>
                            {showResult && (
                                <div className="bg-slate-900 px-8 py-4 border-t border-slate-700">
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>All test cases passed (10/10)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <FileCode className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Load Test Cases</h3>
                        <p className="text-slate-300">
                            Import test cases from JSON or define them inline. Support for complex data structures and edge cases.
                        </p>
                    </div>

                    <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Instant Execution</h3>
                        <p className="text-slate-300">
                            Run your code against all test cases with a single click. Get immediate feedback and detailed output.
                        </p>
                    </div>

                    <div className="bg-slate-800 bg-opacity-50 backdrop-blur p-8 rounded-xl border border-slate-700">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <Terminal className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Debug & Iterate</h3>
                        <p className="text-slate-300">
                            Built-in console output, error highlighting, and test result comparison to help you debug faster.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default LandingPageContent;