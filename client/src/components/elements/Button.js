import React from 'react';

const STYLES = [
    'btn-primary',
    'btn-secondary',
    'btn-tertiary',
    'btn-ghost'
];

const SIZES = [
    'btn-lg',
    'btn-md',
    'btn-sm'
];

export default function Button({
    children, 
    type,
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
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}