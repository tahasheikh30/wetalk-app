import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets.js";
import { signup, login, resetPassword } from "../../config/Firebase.js";

function Login() {
  const [currentState, setCurrentState] = useState("Sign up");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currentState === "Sign up") {
      signup(name, username, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="login">
      <img className="logo" src={assets.logo} alt="" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign up" ? (
          <input
            type="text"
            placeholder="Full name"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        ) : null}
        {currentState === "Sign up" ? (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Sign up" ? (
          <div className="login-term">
            <input type="checkbox" required />
            <p>
              By creating an account, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
        ) : null}

        <div className="login-forgot">
        {currentState === "Login" ? (
            <p className="forgot-password" onClick={() => resetPassword(email)}>Forgot Password</p>
          ) : null}
          {currentState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}>Login</span>{" "}
            </p>
          ) : (
            <p className="login-toggle">
              Create an account?{" "}
              <span onClick={() => setCurrentState("Sign up")}>Click Here</span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
