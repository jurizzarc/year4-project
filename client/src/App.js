import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import Home from './components/views/Home';
import SignUp from './components/views/Authentication/SignUp';
import SignIn from './components/views/Authentication/SignIn';
import Dashboard from './components/views/User/Dashboard';
import Read from './components/views/User/Read/Read';
import GlobalStyles from './theme/GlobalStyles';
import './theme/index.css';

const App = () => {
    // const BASE_API_URL = 'http://localhost:4000/users';
    const BASE_API_URL = 'https://clear-server.herokuapp.com/users'
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const tokenRes = await axios.post(
                `${BASE_API_URL}/tokenIsValid`,
                null, 
                { headers: { 'x-auth-token': token } }
            );
            
            if (tokenRes.data) {
                const userRes = await axios.get(
                    `${BASE_API_URL}/userInfo`,
                    { headers: { 'x-auth-token': token } }
                );

                setUserData({
                    token,
                    user: userRes.data
                });
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                    <Switch>
                        <Route
                            exact path="/"
                            component={Home}
                        />
                        <Route 
                            path="/sign-up" 
                            component={SignUp} 
                        />
                        <Route 
                            path="/sign-in" 
                            component={SignIn} 
                        />
                        <Route 
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <Route 
                            exact path="/read/:userUploadId"
                            render={(props) => (
                                <Read {...props} />
                            )}
                        />
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;