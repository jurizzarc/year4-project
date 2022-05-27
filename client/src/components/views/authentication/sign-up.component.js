import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import useSignUpForm from "../../../hooks/useSignUpForm";
import validateUserInfo from "../../../validation/validateUserInfo";
import UserContext from "../../../contexts/UserContext";

import { ReactComponent as Logo } from "../../../assets/clear-logo-lg.svg";
import Button from "../../elements/button/button.component";
import Danger from "../../elements/alerts/Danger";

const SignUp = () => {
  const BASE_API_URL = "http://localhost:4000/users";
  // const BASE_API_URL = "https://clear-server.herokuapp.com/users";
  const INITIAL_STATE = {
    displayName: "",
    email: "",
    password: "",
    passwordCheck: "",
  };
  const [errorSum, setErrorSum] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onFormSubmit = async () => {
    console.log(isSubmitting);
    const { displayName, email, password, passwordCheck } = values;
    try {
      const newUser = { displayName, email, password, passwordCheck };
      await axios.post(`${BASE_API_URL}/register`, newUser);
      const loginRes = await axios.post(`${BASE_API_URL}/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/dashboard");
    } catch (err) {
      err.response.data.msg && setErrorSum(err.response.data.msg);
    }
  };

  // Call the hook
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useSignUpForm(INITIAL_STATE, validateUserInfo, onFormSubmit);

  return (
    <>
      <header className="page-header">
        <Link to="/" className="app-logo">
          <Logo />
        </Link>
      </header>
      <main className="authentication-form-container">
        <form className="authentication-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Sign Up</h1>
          <p className="form-text">
            Already have an account?&nbsp;
            <Link to="/sign-in" className="form-link">
              Sign In
            </Link>
          </p>
          {errorSum && <Danger message={errorSum} ariaLabel="Error Summary" />}
          <section className="form-fields">
            <div className="form-group">
              <label htmlFor="sign-up-display-name" className="required-input">
                Display Name
              </label>
              <input
                className={`form-field ${
                  errors.displayName ? "has-error" : ""
                }`}
                type="text"
                id="sign-up-display-name"
                name="displayName"
                aria-required="true"
                value={values.displayName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.displayName && (
                <p className="error-msg">{errors.displayName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="sign-up-email" className="required-input">
                E-mail Address
              </label>
              <input
                className={`form-field ${errors.email ? "has-error" : ""}`}
                type="email"
                id="sign-up-email"
                name="email"
                aria-required="true"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="sign-up-password" className="required-input">
                Password
              </label>
              <input
                className={`form-field ${errors.password ? "has-error" : ""}`}
                type="password"
                id="sign-up-password"
                name="password"
                aria-required="true"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="error-msg">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="sign-up-confirm-password"
                className="required-input"
              >
                Confirm Password
              </label>
              <input
                className={`form-field ${
                  errors.passwordCheck ? "has-error" : ""
                }`}
                type="password"
                id="sign-up-confirm-password"
                name="passwordCheck"
                aria-required="true"
                value={values.passwordCheck}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.passwordCheck && (
                <p className="error-msg">{errors.passwordCheck}</p>
              )}
            </div>
          </section>
          <Button type="submit" buttonStyle="btn-primary" buttonSize="btn-lg">
            Sign Up
          </Button>
        </form>
      </main>
    </>
  );
};

export default SignUp;
