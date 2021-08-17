import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.100.76:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (status) => API.post("/posts/", status);

/* export const signUp = (formData) => API.post("/api/auth/register/", formData);
export const login = (formData) => API.post("/api/auth/login/", formData); */
