import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cancel() {
    const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/profile", { replace: true }), 3000);
  }, [navigate]);

  return (
    <div className="container">
      <h1>Payment cancelled</h1>
      <p>
        You have cancelled the payment.
      </p>
    </div>
  );
}

export default Cancel;
