import api from "./axios";

export const getProfile = async () => {
    const response = await api.get("/users/me");
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put("/users/me", profileData);
    return response.data;
};
