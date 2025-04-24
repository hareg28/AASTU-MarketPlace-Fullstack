import React from "react";
import signupVector from "../Assets/signup_vector2.png";
import loginIcon from "../Assets/login_icon.png";
import "../CSS/Registration.css"
import favicon from "../Assets/AASTUMARKETPLACE.png";
export const Registration = () => {
  return (
    <div className="registration-page">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Signup Page</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <link rel="stylesheet" href="signup.css" />
      <div className="registration-content-container">
        <div className="registration-login-vector">
          <img src={signupVector} height="70%" />
        </div>
        <div className="registration-form-container">
          <img src={loginIcon} alt="login icon" height="150px" width="auto" />
          <h1>Create your account</h1>
          <p>Enter the fields below to get started</p>
          <form id="registration-signin-form">
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
            <div className="registration-option">
              Buyer
              <input name="checkbox" defaultValue="buyer" type="radio" />
              Seller
              <input name="checkbox" defaultValue="seller" type="radio" />
            </div>
            <button type="submit">Create account</button>
          </form>
          <p>
            Already have an account?{" "}
            <a
              href="../Log in Page/login.html"
              className="registration-switch"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};