import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../../apis/config";
import { useNavigate } from "react-router";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

export default function OAuthSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
        const decodedToken = jwtDecode(response.credential); 
        console.log("Google User:", decodedToken);
      // Send user details to backend for authentication
      const res = await axiosInstance.post(`/auth/google/callback`, {
        fName: decodedToken.given_name,
        lName : decodedToken.family_name,
        email: decodedToken.email,
        googleId: decodedToken.sub, // Google user ID
        picture: decodedToken.picture,
      });

      // Store token and redirect
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user.role);
      localStorage.setItem("userName", res.data.user.username);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("sType", res.data.user.subscription.subscriptionType);
      localStorage.setItem("endDate", res.data.user.subscription.endDate);
      console.log(res);
      //window.location.href = `${baseUrl}/`; 
      navigate("/"); // Redirect to home

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Authentication failed.");
    }
  };

  const handleFailure = () => {
    toast.error("Google Sign-In failed.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
}
