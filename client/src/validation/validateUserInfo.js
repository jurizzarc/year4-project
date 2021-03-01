export default function validateUserInfo(values) {
    let errors = {};

    if (!values.displayName.trim()) {
        errors.displayName = 'Please enter a display name.';
    }

    if (!values.email) {
        errors.email = 'Please enter an e-mail address.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Please enter a valid e-mail address.';
    }

    if (!values.password) {
        errors.password = 'Please enter a password.';
    } else if (!values.password.length < 6) {
        errors.password = 'The password must be 6 characters or more.';
    }

    if (!values.passwordCheck) {
        errors.passwordCheck = 'Please enter your password again.';
    } else if (values.passwordCheck !== values.password) {
        errors.passwordCheck = 'Passwords do not match.';
    }

    return errors;
}