import React from "react";
// import { UserMenu } from "./Menus/UserMenu";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/Layout.css";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  return (
    <div>
      <div className="sideBar">
        <div className="menu">
          {user?.role === "Admin" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donor-list" && "active"}`}
              >
                <i className={"fa-solid fa-hand-holding-medical"}></i>
                <Link to={"/donor-list"}>Donor List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >
                <i className={"fa-solid fa-hospital"}></i>
                <Link to={"/hospital-list"}>Hospital List</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className={"fa-solid fa-building-ngo"}></i>
                <Link to={"/org-list"}>Organization List</Link>
              </div>
            </>
          )}
          {user?.role === "Organization" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className={"fa-solid fa-warehouse"}></i>
                <Link to={"/"}>Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donor" && "active"
                }`}
              >
                <i className={"fa-solid fa-hand-holding-medical"}></i>
                <Link to={"/donor"}>Donor</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className={"fa-solid fa-hospital"}></i>
                <Link to={"/hospital"}>Hospital</Link>
              </div>
            </>
          )}
          {(user?.role === "Donor" || user?.role === "Hospital") && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/organization" && "active"
                }`}
              >
                <i className={"fa-solid fa-building-ngo"}></i>
                <Link to={"/organization"}>Organization</Link>
              </div>
            </>
          )}
          {user?.role === "Hospital" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/consumer" && "active"
                }`}
              >
                <i className={"fa-solid fa-users"}></i>
                <Link to={"/consumer"}>Consumers</Link>
              </div>
            </>
          )}
          {user?.role === "Donor" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donation" && "active"
                }`}
              >
                <i className={"fa-solid fa-heart-pulse"}></i>
                <Link to={"/donation"}>Donation</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
