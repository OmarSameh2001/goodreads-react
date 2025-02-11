import axiosInstance from "./src/apis/config";

export default async function fetchAndSetUserBooks(setUserBooks) {
  try {
    const res1 = await axiosInstance.post("/auth/verify");
    if (res1.status !== 200) {
      setUserBooks([]); // Reset userBooks to an empty array
      return;
    }

    const response = await axiosInstance.get(
      `/userBook/${res1.data.decodedUser.id}`
    );
    setUserBooks(response.data || []); // Ensure userBooks is an array
  } catch (error) {
    console.error("Failed to fetch user books:", error);
    setUserBooks([]); 
  }
}