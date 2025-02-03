import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this is correctly set in your .env file
  baseURL: import.meta.env.VITE_API_POSTER_URL,
});

// Add interceptor to include Authorization header
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config; // ✅ Must return the modified config
  },
  function (error) {
    return Promise.reject(error); // ✅ Ensure errors are properly passed along
  }
);

export default axiosInstance;
