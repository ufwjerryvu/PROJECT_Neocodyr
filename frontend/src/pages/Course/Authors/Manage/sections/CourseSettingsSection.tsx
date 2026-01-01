import { useState, useEffect } from 'react';
import { Type, FileText, Edit2, Settings, Check, X, Image, Lock, Unlock, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { courseService } from '../../../../../services/courseService';
import { NotFoundPage } from '../../../../Errors/NotFound/Page';
import AlertModal from '../../../../../components/AlertModal';

interface EditMode {
    title: boolean,
    description: boolean,
    is_public: boolean,
    thumbnail: boolean
}

interface CourseData {
    title: string,
    description: string,
    is_public: boolean,
    thumbnail: string | null,
    thumbnailFile?: File | null,
    thumbnailDeleted?: boolean
}

const CourseSettingsSection = () => {
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState<CourseData>({
        title: "",
        description: "",
        is_public: true,
        thumbnail: null
    });

    const [editMode, setEditMode] = useState<EditMode>({
        title: false,
        description: false,
        is_public: false,
        thumbnail: false
    });

    const [fieldErrors, setFieldErrors] = useState<{
        title?: string,
        description?: string,
        thumbnail?: string
    }>({});

    const [originalCourseData, setOriginalCourseData] = useState<CourseData>({
        title: "",
        description: "",
        is_public: true,
        thumbnail: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        const onMount = async () => {
            try {
                const response = await courseService.getCourse(parseInt(courseId ? courseId : "0"));

                const formattedData = {
                    title: response.title,
                    description: response.description,
                    is_public: response.is_public,
                    thumbnail: response.thumbnail ? `${process.env.REACT_APP_STATIC_URL}/${response.thumbnail}` : null
                };

                setOriginalCourseData(formattedData);
                setCourseData(formattedData);
            } catch (e: any) {
                if (e.response?.status === 404) {
                    navigate("/error/notfound", { replace: true });
                }
            }
        }

        onMount();
    }, [courseId, navigate]);

    const hasChanges = (): boolean => {
        return (
            courseData.title !== originalCourseData.title ||
            courseData.description !== originalCourseData.description ||
            courseData.is_public !== originalCourseData.is_public ||
            courseData.thumbnailFile !== undefined ||
            courseData.thumbnailDeleted === true
        );
    };

    const isAnyFieldInEditMode = (): boolean => {
        return editMode.title || editMode.description || editMode.is_public || editMode.thumbnail;
    };

    const handleEditStartClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: true
        }))
    }

    const handleEditCancelClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({ ...prev, [field]: false }));
        
        if (field === 'thumbnail') {
            setCourseData((prev) => ({
                ...prev,
                thumbnail: originalCourseData.thumbnail,
                thumbnailFile: undefined,
                thumbnailDeleted: undefined
            }));
        } else {
            setCourseData((prev) => ({
                ...prev,
                [field]: originalCourseData[field]
            }));
        }
        
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const handleEditSaveClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({ ...prev, [field]: false }));
    }

    const handleFieldChange = (field: keyof CourseData, newValue: string | boolean) => {
        setCourseData((prev) => ({ ...prev, [field]: newValue }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const handleRemoveThumbnail = () => {
        setCourseData((prev) => ({
            ...prev,
            thumbnailFile: undefined,
            thumbnail: null,
            thumbnailDeleted: true
        }));
        setFieldErrors((prev) => ({ ...prev, thumbnail: undefined }));
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setCourseData((prev) => ({
                    ...prev,
                    thumbnailFile: file,
                    thumbnail: URL.createObjectURL(file),
                    thumbnailDeleted: false
                }));
                setFieldErrors((prev) => ({ ...prev, thumbnail: undefined }));
            }
        },
        disabled: !editMode.thumbnail
    });

    const [alertStatus, setAlertStatus] = useState<null | {
        type: "success" | "error" | "warning";
        title: string;
        message: string;
        showCancel?: boolean;
        onConfirm?: () => void | Promise<void>;
    }>(null);

    const handleSubmitSaveChanges = async () => {
        try {
            if (courseData.thumbnailDeleted && originalCourseData.thumbnail) {
                await courseService.deleteThumbnail(parseInt(courseId ? courseId : "0"));
            }

            const formData = new FormData();
            formData.append("title", courseData.title);
            formData.append("description", courseData.description);
            formData.append("is_public", courseData.is_public.toString());
            
            if (courseData.thumbnailFile) {
                formData.append("thumbnail", courseData.thumbnailFile);
            }

            await courseService.updateCourse(
                parseInt(courseId ? courseId : "0"), 
                formData
            );

            setFieldErrors({});
            
            const updatedData = {
                title: courseData.title,
                description: courseData.description,
                is_public: courseData.is_public,
                thumbnail: courseData.thumbnailFile 
                    ? courseData.thumbnail 
                    : (courseData.thumbnailDeleted ? null : originalCourseData.thumbnail)
            };
            
            setOriginalCourseData(updatedData);
            setCourseData({
                ...updatedData,
                thumbnailFile: undefined,
                thumbnailDeleted: undefined
            });

            setAlertStatus({
                type: "success",
                title: "Success",
                message: "Successfully updated course details!",
                showCancel: false
            });
        } catch (e: any) {
            const errors = e.response?.data || {};
            
            setFieldErrors({
                title: errors.title?.[0],
                description: errors.description?.[0],
                thumbnail: errors.thumbnail?.[0]
            });

            setAlertStatus({
                type: "error",
                title: "Error",
                message: "Please fix the errors and try again.",
                showCancel: false
            });
        }
    }

    return (
        <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <Settings className="w-6 h-6 text-purple-400" />
                        Course Settings
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Text Fields */}
                    <div className="space-y-6">
                        {/* Course Title */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-slate-400 text-sm flex items-center gap-2">
                                    <Type className="w-4 h-4 text-purple-400" />
                                    Course Title
                                </label>
                                <div className="flex gap-2">
                                    {!editMode.title ? (
                                        <button onClick={() => handleEditStartClick("title")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditSaveClick("title")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                <Check className="w-4 h-4 text-white" />
                                            </button>
                                            <button onClick={() => handleEditCancelClick("title")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {editMode.title ? (
                                <>
                                    <input
                                        value={courseData.title}
                                        onChange={(e) => handleFieldChange("title", e.target.value)}
                                        className={`w-full bg-slate-950/50 border ${fieldErrors.title ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition`}
                                    />
                                    {fieldErrors.title && (
                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.title}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-slate-100 text-lg">{courseData.title}</p>
                                    {fieldErrors.title && (
                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.title}</p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Course Description */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-slate-400 text-sm flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-purple-400" />
                                    Description
                                </label>
                                <div className="flex gap-2">
                                    {!editMode.description ? (
                                        <button onClick={() => handleEditStartClick("description")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditSaveClick("description")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                <Check className="w-4 h-4 text-white" />
                                            </button>
                                            <button onClick={() => handleEditCancelClick("description")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {editMode.description ? (
                                <>
                                    <textarea
                                        value={courseData.description}
                                        onChange={(e) => handleFieldChange("description", e.target.value)}
                                        rows={4}
                                        className={`w-full bg-slate-950/50 border ${fieldErrors.description ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition resize-none`}
                                    />
                                    {fieldErrors.description && (
                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.description}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p className="text-slate-100 text-lg">{courseData.description}</p>
                                    {fieldErrors.description && (
                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.description}</p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Course Visibility */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-slate-400 text-sm flex items-center gap-2">
                                    {courseData.is_public ? (
                                        <Unlock className="w-4 h-4 text-purple-400" />
                                    ) : (
                                        <Lock className="w-4 h-4 text-purple-400" />
                                    )}
                                    Course Access
                                </label>
                                <div className="flex gap-2">
                                    {!editMode.is_public ? (
                                        <button onClick={() => handleEditStartClick("is_public")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                            <Edit2 className="w-4 h-4 text-purple-400" />
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditSaveClick("is_public")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                <Check className="w-4 h-4 text-white" />
                                            </button>
                                            <button onClick={() => handleEditCancelClick("is_public")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                <X className="w-4 h-4 text-white" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {editMode.is_public ? (
                                <div className="flex gap-3">
                                    {["Explorable", "Invite-Only"].map((type) => {
                                        const isSelected = (type === "Explorable" && courseData.is_public) ||
                                            (type === "Invite-Only" && !courseData.is_public);
                                        return (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => handleFieldChange("is_public", type === "Explorable")}
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
                            ) : (
                                <span className="inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm">
                                    {courseData.is_public ? "Explorable" : "Invite-Only"}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Thumbnail */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-slate-400 text-sm flex items-center gap-2">
                                <Image className="w-4 h-4 text-purple-400" />
                                Course Thumbnail
                            </label>
                            <div className="flex gap-2">
                                {!editMode.thumbnail ? (
                                    <button onClick={() => handleEditStartClick("thumbnail")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                        <Edit2 className="w-4 h-4 text-purple-400" />
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditSaveClick("thumbnail")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                            <Check className="w-4 h-4 text-white" />
                                        </button>
                                        <button onClick={() => handleEditCancelClick("thumbnail")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {editMode.thumbnail ? (
                            <>
                                {courseData.thumbnail ? (
                                    <div className="relative mt-4">
                                        <img
                                            src={courseData.thumbnail}
                                            alt="Thumbnail preview"
                                            className={`w-full h-48 object-cover rounded-lg ${fieldErrors.thumbnail ? 'border-2 border-red-500' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveThumbnail}
                                            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-all"
                                        >
                                            <X className="w-4 h-4 text-white" />
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
                            </>
                        ) : (
                            <>
                                {courseData.thumbnail ? (
                                    <img
                                        src={courseData.thumbnail}
                                        alt="Course thumbnail"
                                        className="w-full h-64 object-cover rounded-lg border border-slate-700/50"
                                    />
                                ) : (
                                    <div className="w-full h-64 bg-slate-900/50 border border-slate-700/50 rounded-lg flex items-center justify-center">
                                        <p className="text-slate-500">No thumbnail uploaded</p>
                                    </div>
                                )}
                                {fieldErrors.thumbnail && (
                                    <p className="text-red-400 text-sm mt-1">{fieldErrors.thumbnail}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Save Button - Only show when there are actual changes AND no fields in edit mode */}
                {hasChanges() && !isAnyFieldInEditMode() && (
                    <div className="mt-8 pt-8 border-t border-slate-700/50">
                        <button
                            onClick={handleSubmitSaveChanges}
                            className="w-full px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] font-medium">
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {alertStatus && 
                <AlertModal
                    isOpen={alertStatus !== null}
                    onClose={() => {setAlertStatus(null)}}
                    onConfirm={alertStatus.onConfirm ? alertStatus.onConfirm : () => {setAlertStatus(null)}}
                    type={alertStatus.type}
                    title={alertStatus.title}
                    message={alertStatus.message}
                    confirmText={"Continue"}
                    cancelText={alertStatus.showCancel ? "Cancel" : undefined}
                />
            }
        </div>
    );
};

export default CourseSettingsSection;