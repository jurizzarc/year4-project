import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';
import Button from '../../elements/Button';
import ErrorSummary from '../../elements/ErrorSummary';
import useSignUpForm from '../../../hooks/useSignUpForm';
import validateUserInfo from '../../../validation/validateUserInfo';

const SignUp = () => {
    const BASE_API_URL = 'http://localhost:4000/users';
    const INITIAL_STATE = {
        displayName: '',
        email: '',
        password: '',
        passwordCheck: ''
    };
    const [errorSum, setErrorSum] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const onFormSubmit = async () => {
        console.log(isSubmitting);
        const { displayName, email, password, passwordCheck } = values;
        try {
            const newUser = { displayName, email, password, passwordCheck };
            await axios.post(
                `${BASE_API_URL}/register`,
                newUser
            );
            const loginRes = await axios.post(
                `${BASE_API_URL}/login`,
                {
                    email,
                    password
                }
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
    }

    // Call the hook
    const {
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isSubmitting
    } = useSignUpForm(INITIAL_STATE, validateUserInfo, onFormSubmit);

    return (
        <main className="authentication-form-container">
            <form 
                className="authentication-form"
                onSubmit={handleSubmit}
            >
                <h1>Sign Up</h1>
                <p>All fields below are required.</p>
                {errorSum && (
                    <ErrorSummary message={errorSum} />
                )}
                <section className="form-fields">
                    <div className="form-group">
                        <label 
                            htmlFor="sign-up-display-name"
                            className="required-input"
                        >
                            Display Name
                        </label>
                        <input
                            className={`form-field ${errors.displayName ? 'has-error': ''}`}
                            type="text"
                            id="sign-up-display-name"
                            name="displayName"
                            value={values.displayName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {
                            errors.displayName && 
                            <p className="error-msg">{errors.displayName}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label 
                            htmlFor="sign-up-email"
                            className="required-input"
                        >
                            E-mail Address
                        </label>
                        <input 
                            className={`form-field ${errors.email ? 'has-error': ''}`}
                            type="email"
                            id="sign-up-email"
                            name="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {
                            errors.email && 
                            <p className="error-msg">{errors.email}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label 
                            htmlFor="sign-up-password"
                            className="required-input"
                        >
                            Password
                        </label>
                        <input 
                            className={`form-field ${errors.password ? 'has-error': ''}`}
                            type="password"
                            id="sign-up-password"
                            name="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {
                            errors.password && 
                            <p className="error-msg">{errors.password}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label 
                            htmlFor="sign-up-confirm-password"
                            className="required-input"
                        >
                            Confirm Password
                        </label>
                        <input 
                            className={`form-field ${errors.passwordCheck ? 'has-error': ''}`}
                            type="password"
                            id="sign-up-confirm-password"
                            name="passwordCheck"
                            value={values.passwordCheck}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {
                            errors.passwordCheck && 
                            <p className="error-msg">{errors.passwordCheck}</p>
                        }
                    </div>
                </section>
                <Button 
                    type="submit"
                    buttonStyle="btn-primary"
                    buttonSize="btn-lg"
                >
                    Sign Up
                </Button>
            </form>
            <p>
                Already have an account?&nbsp;
                <Link 
                    to="/sign-in"
                    className="form-link"
                >
                    Sign In
                </Link>
            </p>
        </main>
    );
};

export default SignUp;