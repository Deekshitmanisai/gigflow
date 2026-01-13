import { User } from "./user.model.js";

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("GET PROFILE ERROR 👉", error);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

/**
 * Update current user profile
 */
export const updateProfile = async (req, res) => {
    try {
        const { bio, skills, avatar } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (bio !== undefined) user.bio = bio;
        if (skills !== undefined) user.skills = skills; // Expecting array
        if (avatar !== undefined) user.avatar = avatar;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                skills: user.skills,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR 👉", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};
