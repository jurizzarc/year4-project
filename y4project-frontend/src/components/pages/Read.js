import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';

export default function Read() {
    const { userData } = useContext(UserContext);

    return (
        <>
            {userData.user ? (
                <div className="page">
                    <p>Hello.</p>
                </div>
            ) : (
                <div className="page">
                    Access not allowed.
                </div>
            )}
        </>
    )
}