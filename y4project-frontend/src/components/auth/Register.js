import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password, passwordCheck, displayName};
        await Axios.post(
            "http://localhost:8888/users/register",
            newUser
        );
        
        const loginRes = await Axios.post(
            "http://localhost:8888/users/login",
            {email,password}
        );
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    };

    return (
        <div className="page">
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label htmlFor="register-email">E-mail Address</label>
                <input 
                    id="register-email" 
                    type="email" 
                    onChange={
                        (e) => setEmail(e.target.value)
                    } 
                />

                <label htmlFor="register-password">Password</label>
                <input 
                    id="register-password" 
                    type="password"
                    onChange={
                        (e) => setPassword(e.target.value)
                    } 
                />
                <input 
                    type="password" 
                    placeholder="Verify password" 
                    onChange={
                        (e) => setPasswordCheck(e.target.value)
                    } 
                />

                <label htmlFor="register-display-name">Display Name</label>
                <input 
                    id="register-display-name" 
                    type="text" 
                    onChange={
                        (e) => setDisplayName(e.target.value)
                    } 
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}