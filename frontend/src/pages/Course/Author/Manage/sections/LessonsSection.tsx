import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Edit2, Trash2, Check, X } from "lucide-react";
import CreateLessonModal from "../components/CreateLessonModal";
import { useNavigate, useParams } from "react-router-dom";
import { courseService } from "../../../../../services/courseService";
import AlertModal from "../../../../../components/AlertModal";

interface Lesson {
    id: number;
    title: string;
    course: number;
    order: number;
    created_at: string;
    updated_at: string;
}

const LessonCard = ({ lesson, onUpdate, onAlert }: {
    lesson: Lesson,
    onUpdate: () => void,
    onAlert: (alert: { type: "success" | "warning" | "error"; title: string; message: string }) => void
}) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(lesson.title);
    const [error, setError] = useState<string | undefined>(undefined);

    const handleEditStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setEditTitle(lesson.title);
    };

    const handleEditCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(false);
        setEditTitle(lesson.title);
        setError(undefined);
    };

    const handleEditSave = async (e: React.MouseEvent) => {
        e.stopPropagation();

        try {
            await courseService.updateLesson(lesson.id, { title: editTitle });
            onAlert({
                type: "success",
                title: "Success",
                message: "Lesson updated successfully"
            });
            setIsEditing(false);
            setError(undefined);
            onUpdate();
        } catch (error: any) {
            setError(error.response?.data?.title?.[0] || "Failed to update lesson");
            onAlert({
                type: "error",
                title: "Update Failed",
                message: error.response?.data?.title?.[0] || "Failed to update lesson"
            });
        }
    };

    const getRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
        
        for (const [unit, seconds] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        
        return 'just now';
    };

    const formatFullDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    return (
        <div
            onClick={() => !isEditing && navigate(`/lessons/${lesson.id}/`)}
            className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-all group cursor-pointer"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-semibold">{lesson.order}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <div className="space-y-1">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => {
                                        setEditTitle(e.target.value);
                                        setError(undefined);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-full px-3 py-2 bg-slate-950/50 border ${
                                        error ? "border-red-500" : "border-slate-600"
                                    } rounded-lg text-slate-100 focus:outline-none focus:ring-2 ${
                                        error ? "focus:ring-red-500" : "focus:ring-purple-500"
                                    } transition`}
                                />
                                {error && (
                                    <p className="text-red-400 text-sm">{error}</p>
                                )}
                            </div>
                        ) : (
                            <>
                                <h3 className="text-slate-100 font-medium truncate">{lesson.title}</h3>
                                <p className="text-slate-400 text-sm">
                                    Created {formatFullDateTime(lesson.created_at)} • Last edited {getRelativeTime(lesson.updated_at)}
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleEditSave}
                                className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
                            >
                                <Check className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={handleEditCancel}
                                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditStart}
                                className="p-2 hover:bg-slate-800 rounded-lg transition"
                            >
                                <Edit2 className="w-4 h-4 text-purple-400" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAlert({
                                        type: "warning",
                                        title: "Feature Unavailable",
                                        message: "Delete functionality is not available yet"
                                    });
                                }}
                                className="p-2 hover:bg-slate-800 rounded-lg transition"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const LessonsSection = () => {
    const [createLessonModalOpen, setCreateLessonModalOpen] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [alertModal, setAlertModal] = useState<{
        type: "success" | "warning" | "error";
        title: string;
        message: string;
    } | null>(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

    const fetchLessons = async () => {
        if (courseId) {
            const data = await courseService.getCourseLessons(parseInt(courseId));
            setLessons(data);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    const handleCreateLesson = async (title: string) => {
        const formData = new FormData();
        formData.append("title", title);

        if (courseId) {
            await courseService.createLesson(parseInt(courseId), formData);
            await fetchLessons();
        } else {
            navigate("/error/notfound");
        }
    };

    return (
        <>
            <div className="mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-purple-400" />
                            Lessons
                        </h2>
                        <button 
                            onClick={() => setCreateLessonModalOpen(true)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Lesson
                        </button>
                    </div>

                    <div className="space-y-3">
                        {lessons.map((lesson) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onUpdate={fetchLessons}
                                onAlert={setAlertModal}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <CreateLessonModal
                isOpen={createLessonModalOpen}
                onClose={() => setCreateLessonModalOpen(false)}
                onSubmit={handleCreateLesson}
            />

            {alertModal && (
                <AlertModal
                    isOpen={alertModal !== null}
                    onClose={() => setAlertModal(null)}
                    onConfirm={() => setAlertModal(null)}
                    type={alertModal.type}
                    title={alertModal.title}
                    message={alertModal.message}
                />
            )}
        </>
    );
};

export default LessonsSection;