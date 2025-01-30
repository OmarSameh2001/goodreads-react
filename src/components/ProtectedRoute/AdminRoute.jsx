import { Navigate } from "react-router";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log(user);
  return <>{token && user === "admin" ? children : <Navigate to={"/login"} />}</>;
}
export default AdminRoute;
