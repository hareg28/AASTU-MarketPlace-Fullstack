import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <div className="App">
        <Nav />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
