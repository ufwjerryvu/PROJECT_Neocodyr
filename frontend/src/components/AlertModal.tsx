import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    type,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}: AlertModalProps) => {
    if (!isOpen) return null;

    const iconConfig = {
        success: {
            icon: Check,
            bgColor: 'bg-green-500/20',
            iconColor: 'text-green-400'
        },
        error: {
            icon: X,
            bgColor: 'bg-red-500/20',
            iconColor: 'text-red-400'
        },
        warning: {
            icon: AlertTriangle,
            bgColor: 'bg-yellow-500/20',
            iconColor: 'text-yellow-400'
        }
    };

    const { icon: Icon, bgColor, iconColor } = iconConfig[type];

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
                    <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
                        <Icon className={`w-8 h-8 ${iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">{title}</h3>
                    <p className="text-slate-400 mb-6">{message}</p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={onConfirm}
                            className="flex-1 px-6 py-2 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        >
                            {confirmText}
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-2 text-slate-300 hover:text-slate-200 transition border border-slate-500/30 rounded-lg hover:border-slate-400/60 hover:bg-slate-500/10"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;