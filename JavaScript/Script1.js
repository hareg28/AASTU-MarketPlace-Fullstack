import React, { useState } from "react";
import "../CSS/Nav-style.css";

// Import images if they are in the src folder
import searchIcon from "../Assets/Search button.png";
import wishlistIcon from "../Assets/Wishlist.png";
import cartIcon from "../Assets/Cart1.png";
import userIcon from "../Assets/user.png";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`You searched for: ${searchQuery}`);
      setSearchQuery("");
    } else {
      alert("Please enter a search query!");
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Close dropdown when mouse leaves
  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div>
      <header>
        <div className="heading">
          <p className="heading-text">
            Find every kind of product or sell what you’ve got.
            <a href="#">Shop Now</a> OR <a href="#">Sell Your Product</a>
          </p>
        </div>
        <nav>
          <h1 className="heading_1">AASTU Marketplace</h1>
          <ul className="navigation">
            <li>
              <a href="/Home/Home.html">Home</a>
            </li>
            <li>
              <a href="/Contact us page/Contact us.html">Contact</a>
            </li>
            <li>
              <a href="/About Page/About_us.html">About</a>
            </li>
            <li>
              <a href="/Sign up page/signup.html">Sign Up</a>
            </li>
          </ul>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              <img src={searchIcon} alt="Search Icon" className="search-icon" />
            </button>
          </div>
          <div className="btns">
            <a href="/WishList Page/wishlist.html">
              <img src={wishlistIcon} alt="Go to Wishlist" />
            </a>
            <a href="/Cart Page/index.html">
              <img src={cartIcon} alt="View Cart" />
            </a>
            <div
              className="dropdown-container"
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              <a id="AccountSetting" href="#">
                <img src={userIcon} alt="Account Settings" />
              </a>
              {dropdownVisible && (
                <div className="menu-container">
                  <div className="sidebar">
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
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="bottom-line" />
      </header>
    </div>
  );
};

export default Nav;
