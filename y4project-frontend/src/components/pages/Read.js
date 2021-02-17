import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';

export default function Read(props) {
    const { userData } = useContext(UserContext);
    const [ userUpload, setUserUpload ] = useState({});
    const [ detections, setDetections ] = useState([]);
    const apiUrl = 'http://localhost:4000/uploads';

    useEffect(() => {
        const userUploadId = props.match.params.userUploadId;
        const token = localStorage.getItem('auth-token');

        const getFileData = () => {
            axios.get(`${apiUrl}/read/${userUploadId}`, {
                headers: {
                    'x-auth-token': token
                }
            }).then((response) => {
                setUserUpload(response.data);
                setDetections(response.data.detections);
            }).catch(error => console.error(`Error: ${error}`));
        };

        getFileData();
    }, []);

    let detectionsArray, extractedText, newText;
    if (detections) {
        detectionsArray = detections.map(detection => detection.text);
        // console.log(detectionsArray);
        extractedText = detectionsArray.join('');
        // console.log(extractedText);
        newText = extractedText.split('\n').map((value, index) => {
            return (
                <p key={index}>
                    {value}
                </p>
            )
        })
    }

    return (
        <>
            {userData.user ? (
                <div className="page">
                    <section className="text">
                        {newText}
                    </section>
                </div>
            ) : (
                <div className="page">
                    Access not allowed.
                </div>
            )}
        </>
    )
}