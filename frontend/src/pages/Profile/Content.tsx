import { useEffect, useRef, useState } from 'react';
import { User, Mail, Calendar, Edit2, Camera, Plus, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import AlertModal from '../../components/AlertModal';

interface EditMode {
    username: boolean,
    firstName: boolean,
    lastName: boolean,
    bio: boolean,
    profilePicture: boolean
}

interface ProfileData {
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    bio: string | null,
    profilePicture: string | null,
    dateJoined: string | null
}

const ProfilePageContent = () => {
    const [, setUser,] = useAuth();
    const [editMode, setEditMode] = useState<EditMode>({
        username: false,
        firstName: false,
        lastName: false,
        bio: false,
        profilePicture: false
    });

    const [fieldErrors, setFieldErrors] = useState<{
        username?: string,
        firstName?: string,
        lastName?: string,
        bio?: string,
        profilePicture?: string
    }>({});

    const [profileData, setProfileData] = useState<ProfileData>({
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        bio: null,
        profilePicture: null,
        dateJoined: null
    });

    const [originalProfileData, setOriginalProfileData] = useState(profileData);

    const handleEditStartClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: true
        }))
    }

    const handleEditCancelClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({ ...prev, [field]: false }));
        
        if (field === 'profilePicture') {
            setProfileData((prev) => ({ ...prev, profilePicture: originalProfileData.profilePicture }));
            setSelectedProfilePicture(null);
        } else {
            setProfileData((prev) => ({ ...prev, [field]: originalProfileData[field] }));
        }
        
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const handleEditSaveClick = (field: keyof EditMode) => {
        setEditMode((prev) => ({ ...prev, [field]: false }));
    }

    const handleFieldChange = (field: keyof ProfileData, newValue: string) => {
        setProfileData((prev) => ({ ...prev, [field]: newValue }));
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    useEffect(() => {
        const loadUserProfile = async () => {
            const user = await userService.getUser();
            const fetchedUserData = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                bio: user.bio,
                profilePicture: user.image ?
                    `${process.env.REACT_APP_STATIC_URL}${user.image}` : null,
                dateJoined: new Date(user.date_joined).toLocaleDateString(
                    'en-GB',
                    {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }
                )
            };

            setOriginalProfileData(fetchedUserData);
            setProfileData(fetchedUserData);
        }

        loadUserProfile();
    }, [])

    const [alertStatus, setAlertStatus] = useState<null | {
        type: "success" | "error" | "warning";
        title: string;
        message: string;
        showCancel?: boolean;
        onConfirm?: () => void | Promise<void>;
    }>(null);

    const hasChanges = (): boolean => {
        return (
            profileData.username !== originalProfileData.username ||
            profileData.firstName !== originalProfileData.firstName ||
            profileData.lastName !== originalProfileData.lastName ||
            profileData.bio !== originalProfileData.bio ||
            selectedProfilePicture !== null
        );
    };

    const isAnyFieldInEditMode = (): boolean => {
        return editMode.username || editMode.firstName || editMode.lastName || editMode.bio;
    };

    const handleClickSaveAllChanges = () => {
        setAlertStatus({
            type: "warning",
            title: "Warning",
            message: "You can only change your details once every 7 days. Are you sure you want to proceed?",
            showCancel: true,
            onConfirm: handleSubmitChanges
        });
    }

    const handleSubmitChanges = async () => {
        try {
            if (selectedProfilePicture) {
                const formData = new FormData();
                formData.append("image", selectedProfilePicture);
                const response = await userService.updateUserPicture(formData);

                if (response.image) {
                    setProfileData((prev) => ({
                        ...prev,
                        profilePicture: `${process.env.REACT_APP_STATIC_URL}${response.image}`
                    }));
                }
            }

            await userService.updateUserInfo({
                username: profileData.username!,
                first_name: profileData.firstName!,
                last_name: profileData.lastName!,
                bio: profileData.bio!
            });

            localStorage.removeItem("userInfo");
            const userInfo = await userService.getUser();
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            setUser(userInfo);

            const updatedData = {
                ...profileData,
                profilePicture: selectedProfilePicture 
                    ? profileData.profilePicture 
                    : originalProfileData.profilePicture
            };

            setOriginalProfileData(updatedData);
            setProfileData(updatedData);
            setSelectedProfilePicture(null);
            setFieldErrors({});

            setAlertStatus({
                type: "success",
                title: "Success",
                message: "Successfully updated your profile!",
                showCancel: false
            });
        } catch (error: any) {
            const errors = error.response?.data || {};

            setFieldErrors({
                username: errors.username?.[0],
                firstName: errors.first_name?.[0],
                lastName: errors.last_name?.[0],
                bio: errors.bio?.[0],
                profilePicture: errors.image?.[0]
            });

            setAlertStatus({
                type: "error",
                title: "Error",
                message: "Please fix the errors and try again.",
                showCancel: false
            });
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);
    
    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedProfilePicture(e.target.files[0]);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prev) => ({ ...prev, profilePicture: reader.result as string }));
            }
            reader.readAsDataURL(e.target.files[0]);
            
            setFieldErrors((prev) => ({ ...prev, profilePicture: undefined }));
        }
    }

    return (
        <main className="min-h-screen px-8 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Profile
                        </span>
                    </h1>
                    <p className="text-slate-400">Manage your account settings</p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

                    <div className="relative bg-gradient-to-br from-slate-950/90 to-indigo-950/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl">
                        <div className="p-10">
                            <div className="flex flex-col items-center mb-12 pb-12 border-b border-slate-700/50">
                                <div className="relative group/avatar mb-4">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full opacity-75 group-hover/avatar:opacity-100 transition"></div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full"></div>
                                    <div className="absolute -inset-0.5 bg-slate-950 rounded-full"></div>

                                    <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-purple-900/60 ${fieldErrors.profilePicture ? 'ring-2 ring-red-500' : ''}`}>
                                        {profileData.profilePicture ? (
                                            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                <User className="w-16 h-16 text-slate-400" />
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full flex items-center justify-center shadow-lg transition">
                                        <Camera className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                                {fieldErrors.profilePicture && (
                                    <p className="text-red-400 text-sm mt-2">{fieldErrors.profilePicture}</p>
                                )}
                            </div>

                            <div className="space-y-8">
                                <div className="py-4 border-b border-slate-700/50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <User className="w-5 h-5 text-purple-400" />
                                        <label className="text-slate-400 text-sm">Name</label>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-5"></div>
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <label className="text-slate-400 text-sm mb-2 block">First Name</label>
                                                    {editMode.firstName ? (
                                                        <>
                                                            <input
                                                                value={profileData.firstName || ''}
                                                                onChange={(e) => { handleFieldChange("firstName", e.target.value) }}
                                                                className={`w-full bg-slate-950/50 border ${fieldErrors.firstName ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition`}
                                                            />
                                                            {fieldErrors.firstName && (
                                                                <p className="text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text-slate-100 text-lg">{profileData.firstName || ""}</p>
                                                            {fieldErrors.firstName && (
                                                                <p className="text-red-400 text-sm mt-1">{fieldErrors.firstName}</p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {!editMode.firstName ? (
                                                        profileData.firstName ? (
                                                            <button onClick={() => handleEditStartClick("firstName")}
                                                                className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleEditStartClick("firstName")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Plus className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        )
                                                    ) : (
                                                        <>
                                                            <button onClick={() => { handleEditSaveClick("firstName") }} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </button>
                                                            <button onClick={() => { handleEditCancelClick("firstName") }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                                <X className="w-4 h-4 text-white" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <label className="text-slate-400 text-sm mb-2 block">Last Name</label>
                                                    {editMode.lastName ? (
                                                        <>
                                                            <input
                                                                onChange={(e) => handleFieldChange("lastName", e.target.value)}
                                                                value={profileData.lastName || ''}
                                                                className={`w-full bg-slate-950/50 border ${fieldErrors.lastName ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition`}
                                                            />
                                                            {fieldErrors.lastName && (
                                                                <p className="text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text-slate-100 text-lg">{profileData.lastName || ""}</p>
                                                            {fieldErrors.lastName && (
                                                                <p className="text-red-400 text-sm mt-1">{fieldErrors.lastName}</p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {!editMode.lastName ? (
                                                        profileData.lastName ? (
                                                            <button onClick={() => { handleEditStartClick("lastName") }} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => handleEditStartClick("lastName")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Plus className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        )
                                                    ) : (
                                                        <>
                                                            <button onClick={() => { handleEditSaveClick("lastName") }} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </button>
                                                            <button onClick={() => { handleEditCancelClick("lastName") }}
                                                                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                                <X className="w-4 h-4 text-white" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between py-4 border-b border-slate-700/50">
                                    <div className="flex items-start gap-4 flex-1">
                                        <User className="w-5 h-5 text-purple-400 mt-1" />
                                        <div className="flex-1">
                                            <label className="text-slate-400 text-sm mb-1 block">Username</label>
                                            {editMode.username ? (
                                                <>
                                                    <input
                                                        onChange={(e) => { handleFieldChange("username", e.target.value) }}
                                                        value={profileData.username || ''}
                                                        className={`w-full bg-slate-950/50 border ${fieldErrors.username ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition`}
                                                    />
                                                    {fieldErrors.username && (
                                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.username}</p>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-slate-100 text-lg">{profileData.username || ""}</p>
                                                    {fieldErrors.username && (
                                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.username}</p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {!editMode.username ? (
                                            profileData.username ? (
                                                <button onClick={() => handleEditStartClick("username")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Edit2 className="w-4 h-4 text-purple-400" />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleEditStartClick("username")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Plus className="w-4 h-4 text-purple-400" />
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditSaveClick("username")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                    <Check className="w-4 h-4 text-white" />
                                                </button>
                                                <button onClick={() => handleEditCancelClick("username")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-4 border-b border-slate-700/50">
                                    <Mail className="w-5 h-5 text-purple-400" />
                                    <div className="flex-1">
                                        <label className="text-slate-400 text-sm mb-1 block">Email</label>
                                        <p className="text-slate-100 text-lg">{profileData.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start justify-between py-4 border-b border-slate-700/50">
                                    <div className="flex items-start gap-4 flex-1">
                                        <User className="w-5 h-5 text-purple-400 mt-1" />
                                        <div className="flex-1">
                                            <label className="text-slate-400 text-sm mb-1 block">Bio</label>
                                            {editMode.bio ? (
                                                <>
                                                    <textarea
                                                        onChange={(e) => handleFieldChange("bio", e.target.value)}
                                                        value={profileData.bio || ''}
                                                        rows={3}
                                                        className={`w-full bg-slate-950/50 border ${fieldErrors.bio ? 'border-red-500' : 'border-purple-500/30'} rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition resize-none`}
                                                    />
                                                    {fieldErrors.bio && (
                                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.bio}</p>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-slate-100 text-lg">{profileData.bio ? profileData.bio : ""}</p>
                                                    {fieldErrors.bio && (
                                                        <p className="text-red-400 text-sm mt-1">{fieldErrors.bio}</p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {!editMode.bio ? (
                                            profileData.bio ? (
                                                <button onClick={() => handleEditStartClick("bio")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Edit2 className="w-4 h-4 text-purple-400" />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleEditStartClick("bio")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Plus className="w-4 h-4 text-purple-400" />
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditSaveClick("bio")} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                    <Check className="w-4 h-4 text-white" />
                                                </button>
                                                <button onClick={() => { handleEditCancelClick("bio") }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-4">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <div className="flex-1">
                                        <label className="text-slate-400 text-sm mb-1 block">Date Joined</label>
                                        <p className="text-slate-100 text-lg">{profileData.dateJoined ? profileData.dateJoined : "Data unavailable"}</p>
                                    </div>
                                </div>
                            </div>

                            {hasChanges() && !isAnyFieldInEditMode() && (
                                <div className="mt-8 pt-8 border-t border-slate-700/50">
                                    <button onClick={handleClickSaveAllChanges}
                                        className="w-full px-6 py-3 text-purple-300 hover:text-purple-200 transition border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] font-medium">
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {alertStatus && 
                    <AlertModal
                        isOpen={alertStatus !== null}
                        onClose={() => {setAlertStatus(null)}}
                        onConfirm={alertStatus.onConfirm ? alertStatus.onConfirm : () => {setAlertStatus(null)}}
                        type={alertStatus.type}
                        title={alertStatus.title}
                        message={alertStatus.message}
                        confirmText={alertStatus.showCancel ? "Yes, save." : "Continue"}
                        cancelText={alertStatus.showCancel ? "Cancel" : undefined}
                    />
                }
            </div>
        </main>
    );
}

export default ProfilePageContent;