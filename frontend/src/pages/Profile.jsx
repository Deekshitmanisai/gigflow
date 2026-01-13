import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProfile, updateProfile } from "../api/users";

const Profile = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: "",
        skills: "",
        avatar: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setFormData({
                bio: data.bio || "",
                skills: data.skills ? data.skills.join(", ") : "",
                avatar: data.avatar || "",
            });
        } catch (err) {
            console.error("Failed to load profile", err);
            setError("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const skillsArray = formData.skills
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s);

            const updatedUser = await updateProfile({
                ...formData,
                skills: skillsArray,
            });

            // Update local user context if needed, or just refresh data
            setSuccess("Profile updated successfully!");
            setEditing(false);

            // Ideally update global auth context too if it stores these details
            // setUser({ ...user, ...updatedUser.user }); 

        } catch (err) {
            setError("Failed to update profile");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading profile...</div>;

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 font-sans text-gray-900">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-4 rounded mb-6">{success}</div>}

            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500 overflow-hidden">
                        {formData.avatar ? (
                            <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {editing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                            <input
                                type="text"
                                value={formData.avatar}
                                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                placeholder="https://example.com/me.jpg"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows="4"
                                placeholder="Tell us about yourself..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                            <input
                                type="text"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                placeholder="React, Node.js, Design"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 outline-none"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h3>
                            <p className="text-gray-800 leading-relaxed">
                                {formData.bio || <span className="text-gray-400 italic">No bio added yet.</span>}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills ? (
                                    formData.skills.split(", ").map((skill, index) => (
                                        skill && (
                                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        )
                                    ))
                                ) : (
                                    <span className="text-gray-400 italic">No skills added yet.</span>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                onClick={() => setEditing(true)}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
