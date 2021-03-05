import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';

const Dashboard = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const login = () => history.push('/sign-in');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/');
    };

    return (
        <>
            {userData.user ? (
                <main>
                    <button onClick={logout}>Sign Out</button>
                </main>
            ) : (
                <main>
                    You are not logged in.
                    <button onClick={login}>Sign In</button>
                </main>
            )}
        </>
    )
}

export default Dashboard;