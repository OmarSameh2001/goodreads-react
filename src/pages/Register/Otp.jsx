import { useState } from "react";
import axios from "axios";
import "../Register/Otp.css";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
function Otp() {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.name === "otp1") {
      setOtp({ ...otp, otp1: e.target.value });
    }
    if (e.target.name === "otp2") {
      setOtp({ ...otp, otp2: e.target.value });
    }
    if (e.target.name === "otp3") {
      setOtp({ ...otp, otp3: e.target.value });
    }
    if (e.target.name === "otp4") {
      setOtp({ ...otp, otp4: e.target.value });
    }
    if (e.target.name === "otp5") {
      setOtp({ ...otp, otp5: e.target.value });
    }
    if (e.target.name === "otp6") {
      setOtp({ ...otp, otp6: e.target.value });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const status = await handleOtp();
    if (status === 200) {
      toast.onChange((payload) => {
        if (
          payload.status === "removed" &&
          payload.content === "user verified successfully"
        ) {
          navigate("/login");
        }
      });
      toast("user verified successfully", {
        type: "success",
        theme: "colored",
      });
    } else {
      toast("Invalid or expired OTP", { type: "error", theme: "colored" });
    }
  }
  async function handleOtp() {
    try {
      const res = await axios.post(`http://localhost:3001/auth/verify-otp`, {
        email: email,
        otp: `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}${otp.otp6}`,
      });
      return res.status;
    } catch (error) {
      return 400;
    }
  }
  function handleResendOtp() {
    axios.post(`http://localhost:3001/auth/send-otp?email=${email}`);
    toast("OTP resent successfully", { type: "success", theme: "colored" });
  }
  return (
    <>
      <form
        className="otp-Form d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your email
        </p>
        <div className="inputContainer">
          <input
            name="otp1"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input1"
          />
          <input
            name="otp2"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input2"
          />
          <input
            name="otp3"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input3"
          />
          <input
            name="otp4"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input4"
          />
          <input
            name="otp5"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input5"
          />
          <input
            name="otp6"
            required="required"
            maxLength={1}
            type="text"
            className="otp-input"
            onChange={handleChange}
            id="otp-input6"
          />
        </div>
        <button className="verifyButton" type="submit">
          Verify
        </button>
        <p className="resendNote">
          Didn't receive the code?{" "}
          <button className="resendBtn" onClick={handleResendOtp}>
            Resend Code
          </button>
        </p>
      </form>
      <ToastContainer />
    </>
  );
}
export default Otp;
