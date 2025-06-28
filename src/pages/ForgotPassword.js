import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!username || !newPassword || !confirmPassword) {
      toast.warn("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reset-password", {
        username,
        newPassword,
      });

      toast.success("Password reset successful!");
      navigate("/"); // Back to login
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to reset password");
    }
  };

  return (
    <div className="logincont">
      <div className="login-container">
        <h2>Reset Password</h2>

        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="reset-btn" onClick={handleReset}>
          Reset Password
        </button>

        <p
          onClick={() => navigate("/")}
          style={{
            marginTop: "12px",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
