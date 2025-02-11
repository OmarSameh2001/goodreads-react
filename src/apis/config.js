import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token dynamically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);
export default axiosInstance;