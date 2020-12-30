// main component
import React, {useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";

import "./style.css";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    return <>
        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    </>;
}