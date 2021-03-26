import React from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft, BiBookOpen, BiCog, BiHelpCircle, BiExit } from 'react-icons/bi';

const SideMenu = () => {
    return (
        <div className="sidebar-content">
            <div
                role="button"
                aria-expanded="false"
                className="sidebar-trigger"
                aria-label="Mobile Sidebar Navigation Menu"
            >
                <span className="sidebar-trigger-icon">
                    <BiMenuAltLeft className="nav-icon" />
                </span>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link
                            to="/library"
                            className="sidebar-nav-link"
                        >
                            <BiBookOpen className="nav-icon" />
                            <em className="nav-link-name">Library</em>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className="sidebar-nav-link"
                        >
                            <BiCog className="nav-icon" />
                            <em className="nav-link-name">Settings</em>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/help"
                            className="sidebar-nav-link"
                        >
                            <BiHelpCircle className="nav-icon" />
                            <em className="nav-link-name">Help</em>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sign-out"
                            className="sidebar-nav-link"
                        >
                            <BiExit className="nav-icon" />
                            <em className="nav-link-name">Sign Out</em>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideMenu;