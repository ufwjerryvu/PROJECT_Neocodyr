import React, { useState } from 'react';
import { Rocket, Mail, Lock, User } from 'lucide-react';
import { BasicUserInfo, userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal';

const RegisterPageContent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [fieldErrors, setFieldErrors] = useState<{
        firstName?: string,
        lastName?: string,
        username?: string,
        email?: string,
        password?: string,
        confirmPassword?: string
    }>({});

    const navigate = useNavigate();

    interface AlertState {
        type: "error" | "success",
        title: string,
        message: string
    }

    const [alert, setAlert] = useState<AlertState | null>(null);

    const handleRegisterSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setFieldErrors((prev) => ({ 
                ...prev, 
                confirmPassword: "Passwords do not match" 
            }));
            setAlert({ 
                type: "error", 
                title: "Validation Error",
                message: "Passwords do not match" 
            });
            return;
        }

        try {
            const response = await userService.registerUser({
                username: formData.username,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password
            })

            const userInfo: BasicUserInfo = {
                username: response.username,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                role: response.role
            }

            setAlert({
                type: "success",
                title: "Registration Successful",
                message: "Redirecting to login..."
            })

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error: any) {
            if (error.response?.status === 400) {
                const errors = error.response?.data || {};
                
                setFieldErrors({
                    firstName: errors.first_name?.[0],
                    lastName: errors.last_name?.[0],
                    username: errors.username?.[0],
                    email: errors.email?.[0],
                    password: errors.password?.[0]
                });

                setAlert({
                    type: "error",
                    title: "Registration Failed",
                    message: "Please fix the errors and try again."
                });
            } else if (error.response?.status >= 500) {
                setAlert({
                    type: "error",
                    title: "Server Error",
                    message: "A server error has occurred"
                })
            } else {
                setAlert({
                    type: "error",
                    title: "Error",
                    message: "An unknown error has occurred"
                })
            }
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-8 py-20">
            <AlertModal
                isOpen={alert !== null}
                type={alert?.type || 'error'}
                title={alert?.title || ''}
                message={alert?.message || ''}
                onClose={() => setAlert(null)}
                onConfirm={() => setAlert(null)}
            />

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                        <span className="text-sm font-medium text-purple-300">Join The Mission</span>
                    </div>

                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Create Account
                        </span>
                    </h1>

                    <p className="text-slate-300">
                        Start your journey to the stars
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

                    <div className="relative bg-gradient-to-br from-slate-950/90 to-indigo-950/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl p-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-purple-300 text-sm font-medium mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => {
                                                setFormData({ ...formData, firstName: e.target.value });
                                                setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
                                            }}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.firstName ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                            placeholder="First name"
                                        />
                                    </div>
                                    {fieldErrors.firstName && (
                                        <p className="mt-1 text-xs text-red-400">{fieldErrors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-purple-300 text-sm font-medium mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => {
                                                setFormData({ ...formData, lastName: e.target.value });
                                                setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
                                            }}
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.lastName ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                            placeholder="Last name"
                                        />
                                    </div>
                                    {fieldErrors.lastName && (
                                        <p className="mt-1 text-xs text-red-400">{fieldErrors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-purple-300 text-sm font-medium mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => {
                                            setFormData({ ...formData, username: e.target.value });
                                            setFieldErrors((prev) => ({ ...prev, username: undefined }));
                                        }}
                                        className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.username ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                        placeholder="Choose a username"
                                    />
                                </div>
                                {fieldErrors.username && (
                                    <p className="mt-1 text-xs text-red-400">{fieldErrors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-purple-300 text-sm font-medium mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                                        }}
                                        className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.email ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-purple-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            setFieldErrors((prev) => ({ ...prev, password: undefined }));
                                        }}
                                        className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.password ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {fieldErrors.password && (
                                    <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-purple-300 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => {
                                            setFormData({ ...formData, confirmPassword: e.target.value });
                                            setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                                        }}
                                        className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-purple-500/40'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {fieldErrors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-400">{fieldErrors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                onClick={handleRegisterSubmit}
                                className="w-full group px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-xl text-lg font-semibold hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 transition shadow-2xl shadow-purple-900/60 hover:shadow-purple-700/80 flex items-center justify-center gap-2"
                            >
                                <Rocket className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
                                Launch Account
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-slate-400">
                                Already have an account?{' '}
                                <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition">
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPageContent;