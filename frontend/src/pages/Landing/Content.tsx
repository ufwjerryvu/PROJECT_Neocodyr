import React, { useState } from 'react';
import { Play, CheckCircle, FileCode, Zap, Terminal, Sparkles, Rocket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPageContent = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [passedTests, setPassedTests] = useState(0);
    const navigate = useNavigate();

    const handleRun = () => {
        setIsRunning(true);
        setPassedTests(0);

        let current = 0;
        const interval = setInterval(() => {
            current++;
            setPassedTests(current);

            if(current >= 10){
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 200);
    };

    return (
        <>
            <main className="px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                            {/* <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> */}
                            <span className="text-sm font-medium text-purple-300">Exploring The Code Universe</span>
                        </div>

                        <h1 className="text-7xl font-bold mb-6 leading-tight">
                            <span className="block text-slate-100">Launch Your Code.</span>
                            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                Into Orbit.
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Aim for the stars. If you don't, who will? Learn, execute, fail, and re-iterate.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button onClick={() => navigate("/dashboard")}
                                className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-xl text-lg font-semibold hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-2xl shadow-purple-900/60 hover:shadow-purple-700/80 flex items-center gap-2">
                                <Rocket className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                                Launch Editor
                            </button>
                            <button className="cursor-pointer px-8 py-4 bg-slate-900/50 backdrop-blur-sm border-2 border-purple-500/40 text-purple-200 rounded-xl text-lg font-semibold hover:bg-slate-800/60 hover:border-purple-400/60 transition hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                View Documentation
                            </button>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mb-32">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

                            <div className="relative bg-gradient-to-br from-slate-950/90 to-indigo-950/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl">
                                <div className="bg-gradient-to-r from-slate-900/80 to-indigo-900/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-purple-500/40">
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg shadow-red-400/60"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/60"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/60"></div>
                                        </div>
                                        <span className="text-purple-300 text-sm font-mono">Lesson.cpp</span>
                                    </div>
                                    <button
                                        onClick={handleRun}
                                        disabled={isRunning}
                                        className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-800 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-lg shadow-purple-900/60 hover:shadow-purple-700/80"
                                    >
                                        <Play className="w-4 h-4" />
                                        {isRunning ? 'Launching...' : 'Launch'}
                                    </button>
                                </div>

                                <div className="p-10 bg-gradient-to-br from-black/60 to-indigo-950/60">
                                    <pre className="text-blue-300 font-mono text-sm leading-relaxed">
                                        <code>{`vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> galaxy;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (galaxy.find(complement) != galaxy.end()) {
            return {galaxy[complement], i};
        }
        
        galaxy[nums[i]] = i;
    }
    
    return {};
}`}</code>
                                    </pre>
                                </div>

                                {passedTests > 0 && (
                                    <div className={passedTests >= 10 ? 
                                                "bg-gradient-to-r from-green-950/90 to-green-950/90 backdrop-blur-sm px-10 py-5 border-t border-green-500/40" : 
                                                "bg-gradient-to-r from-indigo-950/90 to-purple-950/90 backdrop-blur-sm px-10 py-5 border-t border-purple-500/40"}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                {passedTests >= 10 ? <CheckCircle className="w-5 h-5 text-white fill-green"/> : 
                                                                    <Star className="w-5 h-5 text-purple-400 fill-purple-400" />}
                                                <div className={passedTests >= 10 ? "absolute inset-0 blur-md bg-green-400 opacity-80 animate-pulse": 
                                                                                    "absolute inset-0 blur-md bg-purple-400 opacity-80 animate-pulse"}>
                                                </div>
                                            </div>
                                            <span className={passedTests >= 10 ? "text-white font-medium" :
                                                                                    "text-purple-300 font-medium" 
                                            }>
                                                {isRunning ? `Running test case (${passedTests}/10)` : `All ${passedTests} tests passed`}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
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