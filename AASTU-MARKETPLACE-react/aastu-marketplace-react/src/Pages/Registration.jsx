import React from "react";
import signupVector from "../Assets/signup_vector2.png";
import loginIcon from "../Assets/login_icon.png";
import "../CSS/Registration.css"
import favicon from "../Assets/AASTUMARKETPLACE.png";
import { Link } from "react-router-dom";
export const Registration = () => {
  return (
    <div className="registration-page">
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AASTU Marketplace - Sign Up</title>
      <link rel="icon" href={favicon} type="image/x-icon" />
      <link rel="stylesheet" href="signup.css" />
      <div className="registration-grid-container">
        <div className="registration-vector-container">
          <img
            src={signupVector}
            alt="AASTU Marketplace illustration"
            className="vector-image"
          />
          <div className="vector-content">
            <h2>Welcome to AASTU Marketplace</h2>
            <p>The official e-commerce platform for AASTU students and staff</p>
          </div>
        </div>
        <div className="registration-form-container">
          <div className="form-header">
            <img
              src={loginIcon}
              alt="AASTU Marketplace logo"
              className="logo"
            />
            <h1>Create Account</h1>
            <p>Join our community of buyers and sellers</p>
          </div>

          <form id="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">AASTU Email*</label>
                <input
                  type="email"
                  id="email"
                  placeholder="username@aastu.edu.et"
                  pattern=".+@aastu\.edu\.et"
                  required
                />
                <small>Must use your AASTU institutional email</small>
              </div>
            </div>

            <div className="form-row double-column">
              <div className="form-group">
                <label htmlFor="idNumber">ID Number*</label>
                <input
                  type="text"
                  id="idNumber"
                  placeholder="AASTU ID"
                  required
                  pattern="[A-Za-z0-9]{8,12}"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="09XXXXXXXX"
                  required
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            <div className="form-row double-column">
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create password"
                  required
                  minLength="8"
                />
                <div className="password-strength">
                  <span className="strength-bar"></span>
                  <span className="strength-bar"></span>
                  <span className="strength-bar"></span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group account-type">
                <label>Account Type*</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="accountType"
                      value="buyer"
                      required
                    />
                    <span className="radio-custom"></span>
                    Buyer
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="accountType"
                      value="seller"
                      required
                    />
                    <span className="radio-custom"></span>
                    Seller
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>*
                </label>
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};