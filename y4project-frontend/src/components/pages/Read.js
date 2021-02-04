import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';

export default function Read(props) {
    const { userData } = useContext(UserContext);
    const [ userUpload, setUserUpload ] = useState();
    const apiUrl = 'http://localhost:4000/files';
    const userUploadId = props.match.params.userUploadId;
    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        getFileData();
    }, []);

    const getFileData = () =>{
        axios.get(`${apiUrl}/read/${userUploadId}`, {
            headers: {
                'x-auth-token': token
            }
        }).then((response) => {
            //console.log(response.data);
            setUserUpload(response.data);
        }).catch(error => console.error(`Error: ${error}`));
    };

    return (
        <>
            {userData.user ? (
                <div className="page">
                    <p>{userUpload && userUpload.fileName}</p>
                </div>
            ) : (
                <div className="page">
                    Access not allowed.
                </div>
            )}
        </>
    )
}