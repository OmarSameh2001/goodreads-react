import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password)
    // fetch("/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // }).then((res) => {
    //   if (res.ok) {
    //     res.json().then((data) => {
    //       localStorage.setItem("token", data.token);
    //       navigate("/");
    //     });
    //   } else {
    //     alert("Invalid email or password");
    //   }
    // });
  }

  useEffect(() => {
    if(token){
        navigate('/')
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit" className="btn btn-success">
          Login
        </button>
        <p>New to the website? <Link to={'/register'}>Create Account</Link></p>
      </form>
    </div>
  );
}

export default Login;
