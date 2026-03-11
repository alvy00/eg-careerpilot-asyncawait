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
  UserCog,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dbUser, setDbUser] = useState<any>(null);

  // Editable States
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState(
    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070",
  );

  // Password States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setDbUser(data);
            setName(data?.name || user?.displayName || "");
            setRole(data?.role || "user");
            setProfilePic(data?.photo || user?.photoURL);
            if (data?.cover) setCoverPic(data.cover);
          }
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [user]);

  const syncProfileWithDB = async (
    updatedName: string,
    updatedPhoto: string,
    updatedRole: string,
    updatedCover: string,
  ) => {
    if (!user?.email) return;

    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name: updatedName,
        photo: updatedPhoto,
        role: updatedRole,
        cover: updatedCover,
        userId: user.uid,
      }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      throw new Error("Failed to sync with database");
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      const resImg = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const imgData = await resImg.json();
      const uploadedUrl = imgData.data.display_url;

      if (type === "profile") {
        setProfilePic(uploadedUrl);
        await syncProfileWithDB(name, uploadedUrl, role, coverPic);
      } else {
        setCoverPic(uploadedUrl);
        await syncProfileWithDB(name, profilePic, role, uploadedUrl);
      }
      alert(`${type === "profile" ? "Profile" : "Cover"} picture updated!`);
    } catch (error) {
      console.error(error);
      alert("Image update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await syncProfileWithDB(name, profilePic, role, coverPic);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Cover Photo Section */}
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
                src={profilePic || "https://ui-avatars.com/api/?name=User"}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-[#0A0C1B] object-cover shadow-xl bg-[#161B22]"
              />
              <label className="absolute bottom-2 right-2 p-2 bg-orange-600 rounded-lg cursor-pointer hover:bg-orange-500 transition-colors shadow-lg">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "profile")}
                />
              </label>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  {name || "User Name"}
                  {role === "admin" && (
                    <BadgeCheck className="w-6 h-6 text-blue-400" />
                  )}
                </h2>
                <div
                  className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 w-fit ${role === "admin" ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-orange-500/10 border-orange-500/30 text-orange-500"}`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  {role}
                </div>
              </div>
              <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                <Mail className="w-3.5 h-3.5" /> {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 -mt-8">
            {/* Account Details */}
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
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                    Account Role
                  </label>
                  <div className="relative">
                    <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-[#1c2128] border border-white/10 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-orange-500/50 appearance-none cursor-pointer"
                    >
                      <option value="user">User / Member</option>
                      <option value="admin">Administrator</option>
                      <option value="moderator">Moderator</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleProfileUpdate}
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#F06022] hover:bg-[#FF7A43] px-6 py-3.5 rounded-xl font-bold w-full justify-center shadow-lg active:scale-95 disabled:opacity-50"
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
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-orange-500/50"
                />
                <button
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                  className="flex items-center gap-2 bg-white/5 hover:bg-orange-500/10 text-orange-500 border border-orange-500/20 px-6 py-3.5 rounded-xl font-bold w-full justify-center active:scale-95"
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
