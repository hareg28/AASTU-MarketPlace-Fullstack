import React, { useRef } from "react";
import "../CSS/App.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Layout = () => {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup";
  const navRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <div>
      <div className="App">
        <CSSTransition
          in={!isSignupPage}
          timeout={{ enter: 500, exit: 300 }}
          classNames="fade"
          unmountOnExit
          nodeRef={navRef}
        >
          <div ref={navRef}>
            <Nav />
          </div>
        </CSSTransition>
        <div>
          <Outlet />
        </div>
        <CSSTransition
          in={!isSignupPage}
          timeout={{ enter: 500, exit: 300 }}
          classNames="fade"
          unmountOnExit
          nodeRef={footerRef}
        >
          <div ref={footerRef}>
            <Footer />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Layout;
