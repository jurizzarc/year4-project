import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";

import { ReactComponent as Logo } from "../../assets/clear-logo-lg.svg";
import Button from "../elements/button/button.component";

import "./navbar.styles.css";

const Navbar = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="app-logo" onClick={() => setOpen(false)}>
        <Logo />
      </Link>
      <button onClick={openMenu} className="nav-toggler">
        {open ? <BiX className="btn-icon" /> : <BiMenu className="btn-icon" />}
      </button>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/about" className="nav-link" onClick={() => setOpen(false)}>
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/help" className="nav-link" onClick={() => setOpen(false)}>
            Help
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sign-in"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Button
            buttonStyle="btn-primary"
            buttonSize="btn-md"
            ariaLabel="Click to go to Sign Up"
            onClick={() => {
              setOpen(false);
              history.push("/sign-up");
            }}
          >
            Sign Up
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
