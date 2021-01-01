import React, {useState} from "react";

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    return (
        <div className="page">
            <h2>Register</h2>
            <form>
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