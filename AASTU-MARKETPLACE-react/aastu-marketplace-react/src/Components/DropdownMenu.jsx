import React from "react";
import "../CSS/DropdownMenu-style.css"; // Ensure this file exists and contains styles for the dropdown

const DropdownMenu = () => {
  return (
    <div className="dropdown-menu">
      <div className="menu-item">
        <i className="fas fa-user"></i>
        <a
          className="menu-text"
          href="/Account Settings/AccountSetting page.html"
        >
          Manage My Account
        </a>
      </div>
      <div className="menu-item">
        <i className="fas fa-shopping-bag"></i>
        <a className="menu-text" href="/Cart Page/index.html">
          My Order
        </a>
      </div>
      <div className="menu-item">
        <i className="fas fa-times-circle"></i>
        <a className="menu-text" href="/Cancellations Page/cancellations.html">
          My Cancellations
        </a>
      </div>
      <div className="menu-item">
        <i className="fas fa-star"></i>
        <a
          className="menu-text"
          href="/Product-details Page/product details.html"
        >
          My Reviews
        </a>
      </div>
      <div className="menu-item">
        <i className="fas fa-sign-out-alt"></i>
        <a className="menu-text" href="/Sign up page/signup.html">
          Logout
        </a>
      </div>
    </div>
  );
};

export default DropdownMenu;
