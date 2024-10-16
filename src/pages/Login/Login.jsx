import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets.js";

function Login() {
  const [currentState, setCurrentState] = useState("Sign up");

  return (
    <div className="login">
      <img className="logo" src={assets.logo_big} alt="" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign up" ? (
          <input
            type="text"
            placeholder="Full name"
            className="form-input"
            required
          />
        ) : null}
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="form-input"
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
          {currentState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}>Login</span>{" "}
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrentState("Sign up")}>Click Here</span>{" "}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
