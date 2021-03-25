import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

const DashboardHeader = () => {
    return (
        <header className="dashboard-header">
            <BiMenuAltLeft className="side-menu-toggle" />
        </header>
    )
};

export default DashboardHeader;