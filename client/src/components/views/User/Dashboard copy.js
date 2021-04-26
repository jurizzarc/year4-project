import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import SideMenu from '../../navigation/SideMenu';
import ItemsList from '../../elements/ItemsList';
import UploadForm from '../../elements/UploadForm';

const Dashboard = () => {
    const BASE_API_URL = 'http://localhost:4000/uploads';
    // const BASE_API_URL = 'https://clear-server.herokuapp.com/uploads';

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const login = () => history.push('/sign-in');

    const [uploads, setUploads] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
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

    // const element = document.getElementById('root');
    // element.classList.add('dashboard-layout');

    return (
        <>
            {userData.user ? (
                <>
                    <SideMenu />
                    <main className="dashboard-content">
                        <header className="dashboard-header">
                            <h1>Library</h1>
                            
                            <div className="user-info">
                                <div className="user-avatar"></div>
                                <strong className="user-name">{userData.user.displayName}</strong>
                            </div>
                        </header>
                        <ItemsList uploads={uploads} />
                        <UploadForm />
                    </main>
                </>
            ) : (
                <main className="dashboard-content">
                    <h1>You are not logged in.</h1>
                    <button onClick={login}>Sign In</button>
                </main>
            )}
        </>
    )
}

export default Dashboard;