import React, { useRef, useState } from "react";
import { BookOpen, Plus, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { courseService } from "../../../../services/courseService";
import AlertModal from "../../../../components/AlertModal";
import StatusBox from "../../../../components/StatusBox";
import { useNavigate } from "react-router-dom";

const AuthorCreateCoursePageContent = () => {
    interface CourseInfo {
        title: string,
        description: string,
        thumbnail: File | null,
        is_public: boolean
    };

    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        title: "",
        description: "",
        thumbnail: null,
        is_public: true
    });

    const [fieldErrors, setFieldErrors] = useState<{
        title?: string,
        description?: string,
        thumbnail?: string
    }>({});

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof CourseInfo) => {
        setCourseInfo((prev) => ({ ...prev, [field]: e.target.value }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const navigate = useNavigate();

    const handleSubmitPress = async () => {
        try{
            const response = await courseService.createCourse(courseInfo);
            navigate(`/author/courses/${response.id}/manage`, {
                replace: true,
                state: { courseTitle: courseInfo.title }
            });
        }catch(e: any){
            const errors = e.response?.data || {};
            
            setFieldErrors({
                title: errors.title?.[0],
                description: errors.description?.[0],
                thumbnail: errors.thumbnail?.[0]
            });

            setAlertModalInfo({
                onClose: () => setAlertModalInfo(null),
                onConfirm: () => setAlertModalInfo(null),
                type: "error",
                title: "Error",
                message: "Please fix the errors and try again.",
                confirmText: "OK",
            });
        }
    }

    const [alertModalInfo, setAlertModalInfo] = useState<{
        onClose: () => void,
        onConfirm: () => void,
        type: "success" | "error" | "warning", 
        title: string, 
        message: string, 
        confirmText?: string,
        cancelText?: string
    } | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            setCourseInfo((prev) => ({
                ...prev,
                thumbnail: acceptedFiles[0] || null
            }));
            setFieldErrors((prev) => ({ ...prev, thumbnail: undefined }));
        }
    });

    return (
        <main className="px-8 py-20">
            <div className="max-w-4xl mx-auto">
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

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                    <form className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Systems Programming"
                                className={`w-full px-4 py-3 bg-slate-900/50 border ${fieldErrors.title ? 'border-red-500' : 'border-slate-600'} rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${fieldErrors.title ? 'focus:ring-red-500' : 'focus:ring-purple-500'} focus:border-transparent transition-all`}
                                onChange={(e) => { handleFieldChange(e, "title") }}
                            />
                            {fieldErrors.title && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe what students will learn..."
                                className={`w-full px-4 py-3 bg-slate-900/50 border ${fieldErrors.description ? 'border-red-500' : 'border-slate-600'} rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${fieldErrors.description ? 'focus:ring-red-500' : 'focus:ring-purple-500'} focus:border-transparent transition-all resize-none`}
                                onChange={(e) => { handleFieldChange(e, "description") }}
                            />
                            {fieldErrors.description && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Access
                            </label>
                            <div className="flex gap-3">
                                {["Explorable", "Invite-Only"].map((type) => {
                                    const isSelected = (type === "Explorable" && courseInfo.is_public) ||
                                        (type === "Invite-Only" && !courseInfo.is_public);
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setCourseInfo(prev => ({
                                                ...prev,
                                                is_public: type === "Explorable"
                                            }))}
                                            className={`flex-1 px-4 py-3 rounded-lg text-slate-300 transition-all ${isSelected
                                                    ? "bg-purple-500/20 border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                                    : "bg-slate-900/50 border border-slate-600 hover:bg-slate-700/50 hover:border-purple-500/50"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Course Thumbnail
                            </label>

                            {courseInfo.thumbnail ? (
                                <div className="relative mt-4">
                                    <img
                                        src={URL.createObjectURL(courseInfo.thumbnail)}
                                        alt="Thumbnail preview"
                                        className={`w-full h-48 object-cover rounded-lg ${fieldErrors.thumbnail ? 'border-2 border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                                    >
                                        <X onClick={() => setCourseInfo((prev) => ({ ...prev, thumbnail: null }))} className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div {...getRootProps()}
                                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                                        fieldErrors.thumbnail 
                                            ? "border-red-500 bg-red-500/10"
                                            : isDragActive
                                            ? "border-purple-500 bg-purple-500/10"
                                            : "border-slate-600 hover:border-purple-500/50"
                                        }`}>
                                    <input {...getInputProps()} />
                                    <Plus className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                    <p className="text-slate-400 text-sm">
                                        {isDragActive ? "Drop it!" : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-slate-500 text-xs mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                            {fieldErrors.thumbnail && (
                                <p className="text-red-400 text-sm mt-1">{fieldErrors.thumbnail}</p>
                            )}
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={() => {handleSubmitPress()}}
                                type="button"
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                            >
                                Create Course
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {alertModalInfo && (
                <AlertModal
                    isOpen={alertModalInfo !== null}
                    onClose={alertModalInfo ? alertModalInfo.onClose : () => {}}
                    onConfirm={alertModalInfo ? alertModalInfo.onConfirm : () => {}}
                    type={alertModalInfo ? alertModalInfo.type : "error"}
                    title={alertModalInfo ? alertModalInfo.title : "Undefined" }
                    message={alertModalInfo ? alertModalInfo.message : "No message"}
                    confirmText={alertModalInfo?.confirmText}
                    cancelText={alertModalInfo?.cancelText}
                />
            )}
        </main>
    );
};

export default AuthorCreateCoursePageContent;