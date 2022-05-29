import React, { useContext } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

import { BiBookOpen, BiCog, BiHelpCircle, BiExit } from "react-icons/bi";

import UserContext from "../../../contexts/UserContext";

import "./side-nav.styles.css";

const SideNav = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <div className="side-navbar" id="sideNavbar">
      <nav className="side-nav">
        <ul className="side-nav-list">
          <li>
            <Link
              to="/dashboard"
              className={
                splitLocation[1] === "dashboard"
                  ? "activeRoute"
                  : "side-nav-link"
              }
            >
              <BiBookOpen className="nav-icon" />
              <span className="side-nav-name">Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={
                splitLocation[1] === "settings"
                  ? "activeRoute"
                  : "side-nav-link"
              }
            >
              <BiCog className="nav-icon" />
              <span className="side-nav-name">Settings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className={
                splitLocation[1] === "help" ? "activeRoute" : "side-nav-link"
              }
            >
              <BiHelpCircle className="nav-icon" />
              <span className="side-nav-name">Help</span>
            </Link>
          </li>
          <li>
            <button className="side-nav-link" onClick={logout}>
              <BiExit className="nav-icon" />
              <span className="side-nav-name">Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
