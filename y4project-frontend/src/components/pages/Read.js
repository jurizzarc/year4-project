import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
// import NewlineText from '../misc/NewlineText';

export default function Read(props) {
    const { userData } = useContext(UserContext);
    const [ userUpload, setUserUpload ] = useState();
    const [ detections, setDetections ] = useState();
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

    const trim = (str) => {
        return str.toString()
                  .replace(/^"(.+(?="$))"$/, '$1')
    }

    return (
        <>
            {userData.user ? (
                <div className="page">
                    <section className="text">
                        {detections && detections.map(detection => (
                            <p key={detection._id}>
                                {trim(detection.text)}
                            </p>
                        ))}
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