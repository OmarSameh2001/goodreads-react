import axios from "axios";
import { use, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosInstance from "../../apis/config";
import TokenContext from "../../context/token";

function Success() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(search);
  const sessionId = urlParams.get('session_id');
  const subscriptionType = urlParams.get('subscriptionType');
  const id = localStorage.getItem("userId");
  const { setSubscription} = useContext(TokenContext);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.post(`/auth/verify-payment/${id}`,{
            sessionId: sessionId,
            subscriptionType: subscriptionType
        });
        if (response.status === 200) {
          localStorage.setItem("endDate", response.data.endDate);
          localStorage.setItem("sType", response.data.subscriptionType);

          alert("Payment successful");
          //set subscription context 
          setSubscription(true);
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };
    verifyPayment();
  }, []);

  return (
    <div className="container">
      <h1>Success</h1>
      <p>
        Your payment has been successful.
      </p>
    </div>
  );
};

export default Success;
