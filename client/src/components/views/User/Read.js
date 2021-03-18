import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadingSettings from '../../elements/ReadingSettings';
import NewLineText from '../../elements/NewLineText';

const Read = (props) => {
    const BASE_API_URL = 'http://localhost:4000/uploads';
    const [userUpload, setUserUpload] = useState({});
    const [detectedText, setDetectedText] = useState([]);

    useEffect(() => {
        const userUploadId = props.match.params.userUploadId;
        const token = localStorage.getItem('auth-token');

        const getFileData = () => {
            axios.get(`${BASE_API_URL}/read/${userUploadId}`, {
                headers: {
                    'x-auth-token': token
                }
            }).then((response) => {
                setUserUpload(response.data);
                setDetectedText(response.data.detections);
            }).catch(error => console.error(`Error: ${error}`));
        };
        getFileData();
    }, []);

    return (
        <main className="reading-container">
            <ReadingSettings />
            <section className="article-container">
                <article>
                    {detectedText && <NewLineText detections={detectedText} />}
                </article>
            </section>
        </main>
    )
}

export default Read;