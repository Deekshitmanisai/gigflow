import api from "./axios";

export const fetchGigs = async (search = "") => {
  const params = search ? { search } : {};
  const response = await api.get("/gigs", { params });
  return response.data;
};

export const fetchGigById = async (id) => {
  const response = await api.get(`/gigs/${id}`);
  return response.data;
};

export const createGig = async (gigData) => {
  const response = await api.post("/gigs", gigData);
  return response.data;
};
