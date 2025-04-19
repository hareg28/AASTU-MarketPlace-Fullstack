import React from "react";
import "..CSS/login.css";

const Login = () => {
  return (
    <div className="content-container">
      <div className="form-container">
        <img
          src="../Assets/login_icon.png"
          alt="login icon"
          style={{ height: "150px", width: "auto" }}
        />
        <h1>Sign in to your account</h1>
        <p>Enter the fields below to get started</p>
        <form>{/* Add form fields here */}</form>
      </div>
    </div>
  );
};

export default Login;
