import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
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

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword || !role) {
      toast.warn("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        role,
      });
      
      toast.success("Signup successful");
      navigate("/", { replace: true }); // Redirect to login
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="signupcont">
      <div className="signup-container">
        <h2>Signup</h2>

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

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="officer">Officer</option>
          <option value="hod">HOD</option>
        </select>

        <button onClick={handleSignup}>Create Account</button>
      </div>
    </div>
  );
}
