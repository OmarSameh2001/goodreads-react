import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div>
        <h1>Not Found</h1>
        <button className="btn btn-success" onClick={() => navigate("/")}>
          Go To Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
