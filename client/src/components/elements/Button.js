import React from 'react';

const STYLES = [
    'btn-primary',
    'btn-secondary',
    'btn-tertiary',
    'btn-ghost',
    'btn-accessibility'
];

const SIZES = [
    'btn-lg',
    'btn-md',
    'btn-sm'
];

export default function Button({
    children, 
    buttonId,
    type,
    ariaLabel,
    onClick,
    buttonStyle,
    buttonSize
}) {
    const checkButtonStyle = STYLES.includes(buttonStyle) 
        ? buttonStyle 
        : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize)
        ? buttonSize
        : SIZES[0];
    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            id={buttonId} 
            type={type}
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {children}
        </button>
    );
}