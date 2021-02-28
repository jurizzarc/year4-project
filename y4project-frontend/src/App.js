import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import { useTheme } from './theme/useTheme';
import UserContext from './contexts/UserContext';
import axios from 'axios';
import Home from './components/views/Home';

export default function App() {
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
                'http://localhost:4000/users/tokenIsValid', 
                null, 
                { headers: { 'x-auth-token': token } }
            );
            
            if (tokenRes.data) {
                const userRes = await axios.get(
                    'http://localhost:4000/users/userInfo',
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
                            <GlobalStyles/>
                            <Switch>
                                <Route
                                    exact path="/"
                                    component={Home}
                                />
                            </Switch>
                        </ThemeProvider>
                    }
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}