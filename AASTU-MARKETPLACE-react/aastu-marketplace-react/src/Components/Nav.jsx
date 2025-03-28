import React, { useState } from "react";
import "../CSS/Nav-style.css";
import DropdownMenu from "./DropdownMenu";
import searchIcon from "../Assets/Search button.png";
import wishlistIcon from "../Assets/Wishlist.png";
import cartIcon from "../Assets/Cart1.png";
import userIcon from "../Assets/user.png";
import frameIcon from "../Assets/Frame 719.png";
import facebookIcon from "../Assets/Icon-Facebook.png";
import twitterIcon from "../Assets/Icon-X.png";
import instagramIcon from "../Assets/icon-instagram.png";
import linkedinIcon from "../Assets/Icon-Linkedin.png";

const Nav = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div>
      <title>Header/Footer</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Contact us page of the ASTU marketplace"
      />
      <meta name="author" content="Team 1 Section B AASTU students" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/Assets/favicon.png" type="image/x-icon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sora:wght@100..800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
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
            />
            <button className="search-btn">
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative" }}
            >
              <a id="AccountSetting" href="#">
                <img src={userIcon} alt="Account Settings" />
              </a>
              {isDropdownVisible && (
                <div style={{ zIndex: 1000 }}>
                  <DropdownMenu />
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="bottom-line" />
      </header>
      <div className="a" />
      <footer>
        <div className="support-container">
          <h2>Support</h2>
          <h3>
            Addis Ababa, Koyefeche,
            <br />
            Addis Ababa Science
            <br />
            and Technology University
          </h3>
          <h3>AASTUMarketPlace@gmail.com</h3>
          <h3>+251 934 556 789</h3>
        </div>
        <div className="account-container">
          <h2>Account</h2>
          <h3>
            <a href="/Log in Page/login.html">Login</a> /
            <a href="/Sign up page/signup.html">Register</a>
          </h3>
          <h3>
            <a href="/Cart Page/index.html">Cart</a>
          </h3>
          <h3>
            <a href="/WishList Page/wishlist.html">Wishlist</a>
          </h3>
        </div>
        <div className="quick-link">
          <h2>Quick Link</h2>
          <h3>
            <a href="/About Page/About_us.html">About us</a>
          </h3>
          <h3>
            <a href="/Contact us page/Contact us.html">Contact</a>
          </h3>
          <h3>
            <a href="/Sign up page/signup.html">Sale Product</a>
          </h3>
        </div>
        <div className="download-img">
          <h2>Download App</h2>
          <h3>Save $3 with App New User Only</h3>
          <a href="#">
            <img
              className="playstore"
              height="65px"
              src={frameIcon}
              alt="App download link"
            />
          </a>
          <div className="contacts">
            <a href="https://facebook.com" aria-label="Visit our Facebook page">
              <img src={facebookIcon} alt="Facebook Icon" />
            </a>
            <a href="https://twitter.com" aria-label="Visit our Twitter page">
              <img src={twitterIcon} alt="Twitter Icon" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Visit our Instagram page"
            >
              <img src={instagramIcon} alt="Instagram Icon" />
            </a>
            <a href="https://linkedin.com" aria-label="Visit our LinkedIn page">
              <img src={linkedinIcon} alt="LinkedIn Icon" />
            </a>
          </div>
        </div>
        <pre>
          <span>&copy;</span> {currentYear} AASTU Marketplace. All rights
          reserved.
        </pre>
      </footer>
    </div>
  );
};

export default Nav;
