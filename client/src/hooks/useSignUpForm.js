import { useState, useEffect } from 'react';

const useSignUpForm = (initialState, validate, runOnSubmit) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    // touched is an array of all fields that have been touched by the user
    const [touched, setTouched] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);

    // Runs on component load and every time the errors object changes
    useEffect(() => {
        // Call form submission if submit button was hit
        if (isSubmitting) {
            // Run form submission
            runOnSubmit();
            const noErrors = Object.keys(errors).length === 0;
            // Call form submission only if there are no errors
            if (noErrors) {
                // Clear touched array
                setTouched([]);
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    // Reruns after there is a change to touched array or values
    // Checks to see if there are any errors
    useEffect(() => {
        const validationErrors = validate(values);
        const touchedErrors = Object.keys(validationErrors)
            .filter(key => touched.includes(key)) // Get all touched keys
            .reduce((acc, key) => {
                if (!acc[key]) {
                    acc[key] = validationErrors[key];
                }
                return acc;
            }, {});
            setErrors(touchedErrors);
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [touched, values]);

    // Runs every time an input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    // Runs when a field is tapped into
    const handleBlur = (e) => {
        // If field hasn't been touched before add it to the array
        if (!touched.includes(e.target.name)) {
            setTouched([
                ...touched,
                e.target.name
            ]);
        }
    };

    // Runs on form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    };

    // Return values from hook to be used in the form component
    return { 
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        errors,
        isSubmitting
    };
};

export default useSignUpForm;