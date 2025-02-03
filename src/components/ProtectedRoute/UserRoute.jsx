import { Navigate } from "react-router";

function UserRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return <>{token && user === "user" ? children : <Navigate to={"/admin"} />}</>;
}
export default UserRoute;
