import React from 'react';

const ErrorSummary = (props) => {
    return (
        <section className="error-summary">
            <p>
                {props.message}
            </p>
        </section>
    );
}

export default ErrorSummary;