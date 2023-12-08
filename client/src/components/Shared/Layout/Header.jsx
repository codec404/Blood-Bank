import React from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="navbar-brand ">
            <BiSolidDonateBlood color="red" size={"40"} /> Blood Bank App
          </div>
          <ul className="navbar-nav flex-row d-flex align-items-center">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <FaRegUserCircle color="cyan" /> Welcome,{" "}
                {user?.name || user?.hospitalName || user?.organizationName}{" "}
                &nbsp; <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donor" ||
            location.pathname === "/hospital" ||
            location.pathname === "/organization" ||
            location.pathname === "/consumer" ? (
              <li className="nav-item mx-3">
                <Link to={"/analytics"} className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
