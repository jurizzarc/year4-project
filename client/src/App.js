import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import Home from './components/views/Home';
import SignUp from './components/views/Authentication/SignUp';
import SignIn from './components/views/Authentication/SignIn';
import Dashboard from './components/views/User/Dashboard';
import '../src/theme/index.css';

const App = () => {
    const BASE_API_URL = 'http://localhost:4000/users'
    const { theme, themeLoaded } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        setSelectedTheme(theme);
    }, [themeLoaded]);

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
            <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                    {
                        themeLoaded && <ThemeProvider theme={selectedTheme}>
                            <GlobalStyles />
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
                            </Switch>
                        </ThemeProvider>
                    }
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;