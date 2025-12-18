import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPageContent = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen flex items-center justify-center px-8">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Text */}
                <h1 className="text-9xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                {/* Message */}
                <h2 className="text-4xl font-bold text-slate-100 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-slate-400 mb-12">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-all flex items-center gap-2 border border-slate-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </button>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPageContent;