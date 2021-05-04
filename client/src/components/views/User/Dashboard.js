import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import SideMenu from '../../navigation/SideMenu';
import ItemsListGrid from '../../elements/ItemsListGrid';
import UploadForm from '../../elements/UploadForm';

const Dashboard = () => {
    // const BASE_API_URL = 'http://localhost:4000/uploads';
    const BASE_API_URL = 'https://clear-server.herokuapp.com/uploads';
    const [uploads, setUploads] = useState('');
    const { userData } = useContext(UserContext);
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        const getAllUploads = () => {
            axios.get(`${BASE_API_URL}/all`, {
                headers: {
                    'x-auth-token': token
                }
            }).then((response) => {
                const allUploads = response.data;
                setUploads(allUploads);
            }).catch(error => console.error(`Error: ${error}`));
        };
        getAllUploads();
    }, []);

    // if (token === undefined) return <Redirect to="/sign-in" />;

    return (
        <>
            <SideMenu />
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-heading">Library</h1>
                    
                    <div className="user-info">
                        <div className="user-avatar"></div>
                        <strong className="user-name">{userData.user && userData.user.displayName}</strong>
                    </div>
                </header>
                <section className="user-uploads">
                    <ItemsListGrid uploads={uploads && uploads} />
                </section>
                <UploadForm />
            </main>
        </>
    )
}

export default Dashboard;