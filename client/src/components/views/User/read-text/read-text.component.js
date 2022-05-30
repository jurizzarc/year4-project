import React, { useState, useEffect } from "react";
import axios from "axios";

import ReadingCustomisation from "../../../elements/reading-customisation/reading-customisation.component";
import NewLineText from "../../../elements/new-line-text.component";

import "./read-text.styles.css";

const ReadText = (props) => {
  const BASE_API_URL = "http://localhost:4000/uploads";
  //   const BASE_API_URL = "https://clear-server.herokuapp.com/uploads";
  const [detectedText, setDetectedText] = useState([]);
  const [detectionType, setDetectionType] = useState();
  const [hasHandwritingSystem, setHasHandwritingSystem] = useState();

  useEffect(() => {
    const userUploadId = props.match.params.userUploadId;
    const token = localStorage.getItem("auth-token");

    const getFileData = () => {
      axios
        .get(`${BASE_API_URL}/read/${userUploadId}`, {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          setDetectedText(response.data.detections);
          setDetectionType(response.data.textDetection);
          setHasHandwritingSystem(response.data.hasHandwritingSystem);
        })
        .catch((error) => console.error(`Error: ${error}`));
    };
    getFileData();
  }, []);

  return (
    <>
      <ReadingCustomisation />
      <main className="text-container">
        <article>
          {detectedText && (
            <NewLineText
              detections={detectedText}
              detectionType={detectionType}
              hasHandwritingSystem={hasHandwritingSystem}
            />
          )}
        </article>
      </main>
    </>
  );
};

export default ReadText;
