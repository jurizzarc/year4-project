import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import "./uploads-list.styles.css";

const UploadsList = (props) => {
  const uploads = props.uploads;

  const splitFileName = (str) => {
    return str.substring(0, str.indexOf("_"));
  };

  const splitStr = (_text) => {
    let text = _text.split(".");
    let str = text.slice(0, 8).join(".") + ".";
    return str;
  };

  const publicStorageURL =
    "https://storage.googleapis.com/clear-reading-app-uploads";

  return (
    <>
      {uploads.length > 0 ? (
        <ul className="grid">
          {uploads.map((upload) => (
            <li className="card" key={upload._id}>
              <div className="card-img">
                <Link to={{ pathname: `/read/${upload._id}` }}>
                  {upload.textDetection === "hndwrtng-img" && (
                    <img
                      src={`${publicStorageURL}/${upload.fileName}`}
                      alt={`${upload.fileName}`}
                    />
                  )}
                  {upload.textDetection === "digi-text-img" && (
                    <img
                      src={`${publicStorageURL}/${upload.fileName}`}
                      alt={`${upload.fileName}`}
                    />
                  )}
                  {upload.textDetection === "digi-text-pdf" && (
                    <div className="pdf-tn">
                      <p>{splitStr(upload.detections[0].text)}..</p>
                    </div>
                  )}
                </Link>
              </div>
              <div className="card-txt">
                <Link to={{ pathname: `/read/${upload._id}` }}>
                  <strong>{splitFileName(upload.fileName)}</strong>
                </Link>
                <Moment
                  date={upload.createdAt}
                  parse="YYYY-MM-DD"
                  format="DD/MM/YYYY"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <strong>You have not uploaded any files.</strong>
      )}
    </>
  );
};

export default UploadsList;
