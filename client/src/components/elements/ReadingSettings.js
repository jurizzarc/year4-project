import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../elements/Button';
import { BiArrowBack, BiPalette, BiFontFamily, BiAlignLeft } from 'react-icons/bi';

const ReadingSettings = () => {
    const history = useHistory();
    const onBackBtnClick = () => history.push('/dashboard');

    return (
        <header
            className="reading-customisation-menu"
        >
            <Button
                buttonStyle="btn-ghost"
                buttonSize="btn-sm"
                ariaLabel="Back to Dashboard Button"
                onClick={onBackBtnClick}
            >
                <BiArrowBack className="btn-icon" />
                <span className="nav-name">Back</span>
            </Button>

            <ul 
                className="centre-menu"
                role="toolbar"
            >
                <li>
                    <Button
                        buttonStyle="btn-ghost"
                        buttonSize="btn-sm"
                        ariaLabel="Color Options"
                    >
                        <BiPalette className="btn-icon" />
                        <span className="nav-name">Color</span>
                    </Button>
                </li>
                <li>
                    <Button
                        buttonStyle="btn-ghost"
                        buttonSize="btn-sm"
                        ariaLabel="Font Options"
                    >
                        <BiFontFamily className="btn-icon" />
                        <span className="nav-name">Font</span>
                    </Button>
                </li>
                <li>
                    <Button
                        buttonStyle="btn-ghost"
                        buttonSize="btn-sm"
                        ariaLabel="Layout Options"
                    >
                        <BiAlignLeft className="btn-icon" />
                        <span className="nav-name">Layout</span>
                    </Button>
                </li>
            </ul>
        </header>
    );
}

export default ReadingSettings;