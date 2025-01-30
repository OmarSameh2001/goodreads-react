import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
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
        <button className="btn btn-success" onClick={() => user === "admin" ? navigate("/admin") : navigate("/")}>
          Go To Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
