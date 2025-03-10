import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Authentication API requests
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);

// Listings API requests
export const createListing = (listingData, token) =>
  API.post("/listings", listingData, { headers: { Authorization: `Bearer ${token}` } });

export const getListings = () => API.get("/listings"); // Fetch all listings
export const getListingById = (id) => API.get(`/listings/${id}`); // Fetch a single listing
export const deleteListing = (id, token) =>
  API.delete(`/listings/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateListing = (id, listingData, token) =>
  API.put(`/listings/${id}`, listingData, { headers: { Authorization: `Bearer ${token}` } });
