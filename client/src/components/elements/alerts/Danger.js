import React from 'react';

const Danger = (props) => {
    return (
        <section 
            className="danger-alert"
            role="contentinfo"
            aria-label={props.ariaLabel}
        >
            <p>
                {props.message}
            </p>
        </section>
    );
}

export default Danger;