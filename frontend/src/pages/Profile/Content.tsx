import React, { useEffect, useState } from 'react';
import { User, Mail, Calendar, Edit2, Camera, Plus, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BasicUserInfo, ExtendedUserInfo, userService } from '../../services/userService';

interface EditMode {
    username: boolean,
    firstName: boolean,
    lastName: boolean,
    bio: boolean;
}

const ProfilePageContent = () => {
    const [hasEdited, setHasEdited] = useState(false);
    const [editMode, setEditMode] = useState<EditMode>({
        username: false,
        firstName: false,
        lastName: false,
        bio: false
    });

    interface ProfileData {
        username: string | null,
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        bio: string | null,
        profilePicture: string | null,
        dateJoined: string | null
    }

    const [profileData, setProfileData] = useState<ProfileData>({
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        bio: null,
        profilePicture: null,
        dateJoined: null
    });

    const handleToggleEdit = (field: keyof EditMode) => {
        setEditMode((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    useEffect(() => {
        const loadUserProfile = async () => {
            const user = await userService.getUser();
            setProfileData({
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                bio: user.bio,
                profilePicture: user.image,
                dateJoined: new Date(user.date_joined).toLocaleDateString(
                    'en-GB',
                    {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    }
                )
            });
        }

        loadUserProfile();
    }, [])

    return (
        <main className="min-h-screen px-8 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Profile
                        </span>
                    </h1>
                    <p className="text-slate-400">Manage your account settings</p>
                </div>

                {/* Profile Card Container */}
                <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition"></div>

                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-slate-950/90 to-indigo-950/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl">
                        <div className="p-10">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center mb-12 pb-12 border-b border-slate-700/50">
                                <div className="relative group/avatar mb-4">
                                    {/* Outer gradient ring - removed blur */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-full opacity-75 group-hover/avatar:opacity-100 transition"></div>

                                    {/* Middle solid ring */}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full"></div>

                                    {/* Inner dark ring for contrast */}
                                    <div className="absolute -inset-0.5 bg-slate-950 rounded-full"></div>

                                    {/* Profile picture */}
                                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-purple-900/60">
                                        {profileData.profilePicture ? (
                                            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                                <User className="w-16 h-16 text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full flex items-center justify-center shadow-lg transition">
                                        <Camera className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Name Section */}
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
                                                        <input
                                                            value={profileData.firstName || ''}
                                                            className="w-full bg-slate-950/50 border border-purple-500/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition"
                                                        />
                                                    ) : (
                                                        <p className="text-slate-100 text-lg">{profileData.firstName || ""}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {!editMode.firstName ? (
                                                        profileData.firstName ? (
                                                            <button onClick={() => handleToggleEdit("firstName")}
                                                                className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        ) : (
                                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Plus className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        )
                                                    ) : (
                                                        <>
                                                            <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </button>
                                                            <button onClick={() => { handleToggleEdit("firstName") }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
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
                                                        <input
                                                            value={profileData.lastName || ''}
                                                            className="w-full bg-slate-950/50 border border-purple-500/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition"
                                                        />
                                                    ) : (
                                                        <p className="text-slate-100 text-lg">{profileData.lastName || ""}</p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {!editMode.lastName ? (
                                                        profileData.lastName ? (
                                                            <button onClick={() => { handleToggleEdit("lastName") }} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Edit2 className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        ) : (
                                                            <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                                <Plus className="w-4 h-4 text-purple-400" />
                                                            </button>
                                                        )
                                                    ) : (
                                                        <>
                                                            <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </button>
                                                            <button onClick={() => { handleToggleEdit("lastName") }}
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

                                {/* Username section */}
                                <div className="flex items-start justify-between py-4 border-b border-slate-700/50">
                                    <div className="flex items-start gap-4 flex-1">
                                        <User className="w-5 h-5 text-purple-400 mt-1" />
                                        <div className="flex-1">
                                            <label className="text-slate-400 text-sm mb-1 block">Username</label>
                                            {editMode.username ? (
                                                <input
                                                    value={profileData.username || ''}
                                                    className="w-full bg-slate-950/50 border border-purple-500/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition"
                                                />
                                            ) : (
                                                <p className="text-slate-100 text-lg">{profileData.username || ""}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {!editMode.username ? (
                                            profileData.username ? (
                                                <button onClick={() => handleToggleEdit("username")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Edit2 className="w-4 h-4 text-purple-400" />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleToggleEdit("username")} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Plus className="w-4 h-4 text-purple-400" />
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                    <Check className="w-4 h-4 text-white" />
                                                </button>
                                                <button onClick={() => handleToggleEdit("username")} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Email Section */}
                                <div className="flex items-center gap-4 py-4 border-b border-slate-700/50">
                                    <Mail className="w-5 h-5 text-purple-400" />
                                    <div className="flex-1">
                                        <label className="text-slate-400 text-sm mb-1 block">Email</label>
                                        <p className="text-slate-100 text-lg">{profileData.email}</p>
                                    </div>
                                </div>

                                {/* Bio Section */}
                                <div className="flex items-start justify-between py-4 border-b border-slate-700/50">
                                    <div className="flex items-start gap-4 flex-1">
                                        <User className="w-5 h-5 text-purple-400 mt-1" />
                                        <div className="flex-1">
                                            <label className="text-slate-400 text-sm mb-1 block">Bio</label>
                                            {editMode.bio ? (
                                                <textarea
                                                    value={profileData.bio || ''}
                                                    rows={3}
                                                    className="w-full bg-slate-950/50 border border-purple-500/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500/60 transition resize-none"
                                                />
                                            ) : (
                                                <p className="text-slate-100 text-lg">{profileData.bio ? profileData.bio : ""}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {!editMode.bio ? (
                                            profileData.bio ? (
                                                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Edit2 className="w-4 h-4 text-purple-400" />
                                                </button>
                                            ) : (
                                                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                                                    <Plus className="w-4 h-4 text-purple-400" />
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition">
                                                    <Check className="w-4 h-4 text-white" />
                                                </button>
                                                <button onClick={() => { handleToggleEdit("bio") }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Date Joined Section */}
                                <div className="flex items-center gap-4 py-4">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                    <div className="flex-1">
                                        <label className="text-slate-400 text-sm mb-1 block">Date Joined</label>
                                        <p className="text-slate-100 text-lg">{profileData.dateJoined ? profileData.dateJoined : "Data unavailable"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            {hasEdited && (
                                <div className="mt-8 pt-8 border-t border-slate-700/50">
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg shadow-purple-900/30">
                                        Save Changes
                                    </button>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProfilePageContent;