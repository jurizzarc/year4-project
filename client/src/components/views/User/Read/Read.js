import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReadingSettings from '../../../elements/ReadingSettings';
import NewLineText from '../../../elements/NewLineText';
import "./article_styles.css";

const Read = (props) => {
    // const BASE_API_URL = 'http://localhost:4000/uploads';
    const BASE_API_URL = 'https://clear-server.herokuapp.com/uploads';
    const [detectedText, setDetectedText] = useState([]);
    const [detectionType, setDetectionType] = useState();
    const [hasHandwritingSystem, setHasHandwritingSystem] = useState();

    useEffect(() => {
        const userUploadId = props.match.params.userUploadId;
        const token = localStorage.getItem('auth-token');

        const getFileData = () => {
            axios.get(`${BASE_API_URL}/read/${userUploadId}`, {
                headers: {
                    'x-auth-token': token
                }
            }).then((response) => {
                setDetectedText(response.data.detections);
                setDetectionType(response.data.textDetection);
                setHasHandwritingSystem(response.data.hasHandwritingSystem);
            }).catch(error => console.error(`Error: ${error}`));
        };
        getFileData();
    }, []);

    return (
        <>
            <ReadingSettings />
            <main className="reading-container">
                <article>
                    {detectedText && 
                        <NewLineText 
                            detections={detectedText}
                            detectionType={detectionType}
                            hasHandwritingSystem={hasHandwritingSystem}
                        />
                    }
                </article>
            </main>
        </>
    )
}

export default Read;