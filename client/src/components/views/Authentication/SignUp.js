import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../elements/Button';
import useSignUpForm from '../../../hooks/useSignUpForm';
import validateUserInfo from '../../../validation/validateUserInfo';

const Main = styled.main`
    margin: 0 auto;
    max-width: calc(25rem + 1vw);
`;

const SecondaryText = styled.p`
    font-size: var(--small-text-size);

    a {
        font-weight: 600;
    }
`;

export default function Register() {
    const { handleChange, values, handleSubmit, errors } = useSignUpForm(validateUserInfo);

    return (
        <Main>
            <form 
                className="authentication-form"
                onSubmit={handleSubmit}
            >
                <h3>Sign Up</h3>
                <p>
                    All fields below are required.
                </p>
                <section className="form-fields">
                    <div className="form-group">
                        <label htmlFor="sign-up-display-name">Display Name</label>
                        <input 
                            type="text"
                            id="sign-up-display-name"
                            name="displayName"
                            value={values.displayName}
                            onChange={handleChange}
                        />
                        {errors.displayName && <p className="error-msg">{errors.displayName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="sign-up-email">E-mail Address</label>
                        <input 
                            type="email"
                            id="sign-up-email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sign-up-password">Password</label>
                        <input 
                            type="password"
                            id="sign-up-password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sign-up-confirm-password">Confirm Password</label>
                        <input 
                            type="password"
                            id="sign-up-confirm-password"
                            name="passwordCheck"
                            value={values.passwordCheck}
                            onChange={handleChange}
                        />
                    </div>
                </section>
                <Button
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>
            <SecondaryText>
                Already have an account?&nbsp;
                <Link to="/sign-in"
                >
                    Sign In
                </Link>
            </SecondaryText>
        </Main>
    );
}