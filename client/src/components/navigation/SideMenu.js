import React from 'react';
import { Link } from 'react-router-dom';
import { BiBookOpen, BiCog, BiHelpCircle, BiExit } from 'react-icons/bi';

const SideMenu = () => {
    return (
        <div className="side-menu">
            <nav className="side-nav">

                <ul className="side-nav-list">
                    <li className="side-nav-list-item">
                        <Link
                            to="/library"
                            className="side-nav-link"
                        >
                            <BiBookOpen className="side-nav-icon" />
                            <span className="side-nav-name">Library</span>
                        </Link>
                    </li>
                    <li className="side-nav-list-item">
                        <Link
                            to="/settings"
                            className="side-nav-link"
                        >
                            <BiCog className="side-nav-icon" />
                            <span className="side-nav-name">Settings</span>
                        </Link>
                    </li>
                    <li className="side-nav-list-item">
                        <Link
                            to="/help"
                            className="side-nav-link"
                        >
                            <BiHelpCircle className="side-nav-icon" />
                            <span className="side-nav-name">Help</span>
                        </Link>
                    </li>
                    <li className="side-nav-list-item">
                        <Link
                            to="/sign-out"
                            className="side-nav-link"
                        >
                            <BiExit className="side-nav-icon" />
                            <span className="side-nav-name">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default SideMenu;