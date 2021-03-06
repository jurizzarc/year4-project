import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';
import Button from '../../elements/Button.js';
import Danger from '../../elements/alerts/Danger';

const SignIn = () => {
    // const BASE_API_URL = 'http://localhost:4000/users';
    const BASE_API_URL = 'https://clear-server.herokuapp.com/users';
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorSum, setErrorSum] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = { email, password };
            const loginRes = await axios.post(
                `${BASE_API_URL}/login`,
                currentUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/dashboard');
        } catch (err) {
            err.response.data.msg && setErrorSum(err.response.data.msg);
        }
    };

    return (
        <>
            <header className="page-header">
                <Link to="/" className="nav-logo">
                    <img src="logo-lg.png" />
                </Link>
            </header>
            <main className="authentication-form-container">
                <form
                    className="authentication-form"
                    onSubmit={onFormSubmit}
                >
                    <h1 className="form-heading">Sign In</h1>
                    <p className="form-text">
                        Don't have an account?&nbsp;
                        <Link
                            to="/sign-up"
                            className="form-link"
                        >
                            Sign Up
                        </Link>
                    </p>
                    {errorSum && (
                        <Danger 
                            message={errorSum} 
                            ariaRole="Error Summary"
                        />
                    )}
                    <section className="form-fields">
                        <div className="form-group">
                            <label htmlFor="sign-in-email">E-mail Address</label>
                            <input 
                                className="form-field"
                                type="email"
                                id="sign-in-email"
                                name="email"
                                aria-required="true"
                                onChange={
                                    (e) => setEmail(e.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sign-in-password">Password</label>
                            <input 
                                className="form-field"
                                type="password"
                                id="sign-in-password"
                                name="password"
                                aria-required="true"
                                onChange={
                                    (e) => setPassword(e.target.value)
                                }
                            />
                        </div>
                    </section>
                    <Button
                        type="submit"
                        buttonStyle="btn-primary"
                        buttonSize="btn-lg"
                    >
                        Sign In
                    </Button>
                </form>
            </main>
        </>
    );
};

export default SignIn;