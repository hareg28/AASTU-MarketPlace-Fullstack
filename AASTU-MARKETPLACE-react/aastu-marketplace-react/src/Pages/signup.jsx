import React from "react";
import "../CSS/signup.css";
import signupVector from "../Assets/signup_vector2.png";
import loginIcon from "../Assets/login_icon.png";

const Signup = () => {
  return (
    <div className="content-container">
      <div className="login-vector">
        <img src={signupVector} alt="Signup Vector" style={{ height: "70%" }} />
      </div>
      <div className="form-container">
        <img
          src={loginIcon}
          alt="Login Icon"
          style={{ height: "150px", width: "auto" }}
        />
        <h1>Create your account</h1>
        <p>Enter the fields below to get started</p>
        <form id="signin-form">
          <label htmlFor="fullName">Full name*</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full name"
            required
          />
          <label htmlFor="email">Email address*</label>
          <input type="email" id="email" placeholder="Enter email" required />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            required
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
