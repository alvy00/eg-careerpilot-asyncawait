"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase.config";
import { updatePassword } from "firebase/auth";
import {
    Camera,
    Mail,
    User,
    Lock,
    Save,
    Loader2,
    ShieldCheck,
    Check,
    BadgeCheck,
    Star,
} from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [dbUser, setDbUser] = useState<any>(null);

    // Editable States
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(
        "https://via.placeholder.com/150",
    );
    const [coverPic, setCoverPic] = useState(
        "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
    );

    // Password States
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // User role and details from DB
    useEffect(() => {
        if (user?.email) {
            fetch(`/api/users?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setDbUser(data);

                        setName(data?.name || user?.displayName || "");
                        setProfilePic(
                            data?.photo ||
                                user?.photoURL ||
                                "https://i.ibb.co.com/6cxPXLXY/gettyimages-1300845620-612x612.jpg",
                        );
                    }
                })
                .catch((err) => {
                    console.error("Error fetching user:", err);
                });
        }
    }, [user]);

    // Image Upload Logic (using ImgBB)
    const uploadImageToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: formData,
            },
        );
        const data = await response.json();
        return data.data.display_url;
    };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "profile" | "cover",
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const uploadedUrl = await uploadImageToImgBB(file);
            if (type === "profile") setProfilePic(uploadedUrl);
            else setCoverPic(uploadedUrl);
        } catch (error) {
            alert("Image upload failed! Check ImgBB API Key.");
        } finally {
            setLoading(false);
        }
    };

    // Profile update function to sync with DB (also called after image upload to save new URLs)
    const handleProfileUpdate = async () => {
        setLoading(true);
        try {
            if (!user) {
                return;
            }
            const response = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    name: name,
                    photo: profilePic,
                    userId: user.uid,
                }),
            });
            if (response.ok) alert("Profile Sync Successful!");
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setLoading(false);
        }
    };

    // Password Update Logic (only for email/password users, not for Google sign-in)
    const handlePasswordUpdate = async () => {
        if (!newPassword || newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, newPassword);
                alert("Password updated successfully!");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0C1B] text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-[#161B22]/40 backdrop-blur-2xl rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                {/* Cover Section */}
                <div className="relative h-48 md:h-64 group">
                    <img
                        src={coverPic}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Camera className="w-8 h-8 text-white/70" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, "cover")}
                        />
                    </label>
                </div>

                <div className="relative px-8 pb-8">
                    {/* Profile Header & Role Badge */}
                    <div className="relative -top-16 flex flex-col md:flex-row items-end gap-6">
                        <div className="relative group">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#0A0C1B] object-cover shadow-xl"
                            />
                            <label className="absolute bottom-2 right-2 p-2 bg-orange-600 rounded-lg cursor-pointer hover:bg-orange-500 transition-colors shadow-lg">
                                <Camera className="w-5 h-5 text-white" />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImageChange(e, "profile")
                                    }
                                />
                            </label>
                        </div>

                        <div className="flex-1 pb-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <h2 className="text-3xl font-bold flex items-center gap-2">
                                    {name || "User Name"}
                                    {dbUser?.role === "admin" && (
                                        <BadgeCheck className="w-6 h-6 text-blue-400" />
                                    )}
                                </h2>

                                {/* Role Badge Logic */}
                                <div
                                    className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 w-fit
                  ${
                      dbUser?.role === "admin"
                          ? "bg-red-500/10 border-red-500/30 text-red-500"
                          : "bg-orange-500/10 border-orange-500/30 text-orange-500"
                  }`}
                                >
                                    <ShieldCheck className="w-3 h-3" />
                                    {dbUser?.role || "Member"}
                                </div>
                            </div>
                            <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                                <Mail className="w-3.5 h-3.5" /> {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 -mt-8">
                        {/* Personal Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-500">
                                <User className="w-5 h-5" /> Account Details
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                        Account Role
                                    </label>
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 opacity-60 cursor-not-allowed">
                                        <Star className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm capitalize font-semibold">
                                            {dbUser?.role || "user"}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleProfileUpdate}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-[#F06022] hover:bg-[#FF7A43] px-6 py-3.5 rounded-xl font-bold transition-all text-sm w-full justify-center shadow-lg shadow-orange-600/20 active:scale-95"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}{" "}
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-500">
                                <Lock className="w-5 h-5" /> Security
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handlePasswordUpdate}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-orange-500/10 text-orange-500 border border-orange-500/20 px-6 py-3.5 rounded-xl font-bold transition-all text-sm w-full justify-center active:scale-95"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Check className="w-4 h-4" />
                                    )}{" "}
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
