import React from 'react';
import DashboardHeader from '../../navigation/DashboardHeader';
import SideMenu from '../../navigation/SideMenu';

const Library = () => {
    document.body.className += ' dashboard-body';

    return (
        <>
            <DashboardHeader />
            <SideMenu />
            <main className="library-container">
                <h1>Library</h1>
            </main>
        </>
    );
}

export default Library;