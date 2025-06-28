import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "hod") {
      navigate("/hod-dashboard", { replace: true });
    } else if (user?.role === "officer") {
      navigate("/official-dashboard", { replace: true });
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn("Please fill in both username and password.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log("API Responses", res);
      console.log("response data :", res.data);
      const responseData = res.data;
      const user = responseData.user||responseData;
      const role = user.role;

     
  
      //  Save to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ username:user.username ,role: user.role })
      );

      // ✅ Redirect based on role
      if (role === "hod") {
        navigate("/hod-dashboard", { replace: true });
      } else if (role === "officer") {
        navigate("/official-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      toast.error("Invalid credentials. Please sign up if you're a new user.");
    }
  };

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="logincont">
      <div className="login-container">
        <h2 className="animated-title">Plan. Assign. Achieve</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="forgot-password-link" onClick={()=>navigate("/forgot-password")} 
        style={{cursor: "pointer", color: "#007bff", textDecoration: "underline", marginTop: "10px"}}>Forgot Password?</p>

        <div className="button-container">
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="signup-btn" onClick={handleGoToSignup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
