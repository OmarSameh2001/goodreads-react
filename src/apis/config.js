import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://goodreads-node-production.up.railway.app", 
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