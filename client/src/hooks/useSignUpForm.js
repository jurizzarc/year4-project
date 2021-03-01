import { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

const useSignUpForm = validateUserInfo => {
    const [values, setValues] = useState({
        displayName: '',
        email: '',
        password: '',
        passwordCheck: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateUserInfo(values));
    }

    return { handleChange, values, handleSubmit, errors };
};

export default useSignUpForm;