import React from 'react';
import DashboardHeader from '../../navigation/DashboardHeader';
import SideMenu from '../../navigation/SideMenu';

const Library = () => {
    const element = document.getElementById('root');
    element.classList.add('dashboard-layout');

    return (
        <>
            <SideMenu />
            <main className="dashboard-content">
                <h1>Library</h1>
            </main>
        </>
    );
}

export default Library;