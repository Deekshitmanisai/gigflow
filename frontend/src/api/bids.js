import api from "./axios";

export const placeBid = async (bidData) => {
  const response = await api.post("/bids", bidData);
  return response.data;
};

export const fetchBidsForGig = async (gigId) => {
  const response = await api.get(`/bids/gig/${gigId}`);
  return response.data;
};

export const hireBid = async (bidId) => {
  const response = await api.patch(`/bids/${bidId}/hire`);
  return response.data;
};

export const checkBidStatus = async (gigId) => {
  const response = await api.get(`/bids/check/${gigId}`);
  return response.data;
};
