import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

interface CreateLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string) => Promise<void>;
}

const CreateLessonModal: React.FC<CreateLessonModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = async () => {
        try {
            await onSubmit(title);
            setTitle("");
            setError(undefined);
            onClose();
        } catch (e: any) {
            setError(e.response?.data?.title?.[0] || "Failed to create lesson");
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="relative bg-gradient-to-br from-slate-950/90 to-indigo-950/90 backdrop-blur-xl rounded-2xl border border-purple-500/40 shadow-2xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200 transition"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-6">Create Lesson</h3>
                    
                    <div className="w-full mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2 text-left">
                            Lesson Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Introduction to Variables"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setError(undefined);
                            }}
                            className={`w-full px-4 py-3 bg-slate-900/50 border ${
                                error ? 'border-red-500' : 'border-slate-600'
                            } rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${
                                error ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                        />
                        {error && (
                            <p className="text-red-400 text-sm mt-1 text-left">{error}</p>
                        )}
                    </div>

                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        >
                            Create
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-2 text-slate-300 hover:text-slate-200 transition border border-slate-500/30 rounded-lg hover:border-slate-400/60 hover:bg-slate-500/10"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLessonModal;