// main component
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/common/Header";
import Home from "./components/views/Home";
import Login from "./components/views/Authentication/Login";
import Register from "./components/views/Authentication/Register";
import Dashboard from "./components/views/User/Dashboard";
import Read from "./components/views/User/Read";
import UserContext from "./contexts/UserContext";

import "../src/theme/style.css"

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }

            const tokenRes = await Axios.post(
                "http://localhost:4000/users/tokenIsValid", 
                null, 
                {headers: {"x-auth-token": token}}
            );
            
            if (tokenRes.data) {
                const userRes = await Axios.get(
                    "http://localhost:4000/users/userInfo",
                    {headers: {"x-auth-token": token}}
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
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route 
                                exact path="/read/:userUploadId"
                                render={(props) => (
                                    <Read {...props} />
                                )}
                            />
                        </Switch>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}