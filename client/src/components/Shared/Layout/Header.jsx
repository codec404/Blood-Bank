import React from "react";

const Header = () => {
  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand ">Blood Bank App</div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">Welcome</p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
