import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const SideMenu = () => {
    const history = useHistory();
    const { setUserData } = useContext(UserContext);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/');
    };

    return (
        <div className="side-menu-container">
            <button onClick={logout}>Sign Out</button>
        </div>
    )
};

export default SideMenu;