import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ItemsListGrid = (props) => {
    const uploads = props.uploads;
    const splitFileName = (str) => {
        return str.substring(0, str.indexOf('_'));
    };
    const uploadType = (str) => {
        let type;
        if (str === 'digi-text-pdf') type = 'PDF';
        if (str === 'hndwrtng-img') type = 'Paper-based Notes';
        if (str === 'digi-text-img') type= 'Text in Image';
        return type;
    }
    const splitDate = (str) => {
        return str.substring(0, str.indexOf('T'));
    };

    const publicStorageURL = 'https://storage.googleapis.com/clear-reading-app-uploads';

    return (
        <>
            {uploads.length > 0 ?
                <div className="grid-wrapper">
                    <ul className="auto-items-grid">
                        {uploads.map((upload) => (
                            <li
                                className="item-card"
                                key={upload._id}
                            >
                                 <Link to={{ pathname: `/read/${upload._id}` }}>
                                    <span className="item-card-img">
                                        {upload.textDetection === 'hndwrtng-img' &&
                                            <img src={`${publicStorageURL}/${upload.fileName}`} />
                                        }
                                        {upload.textDetection === 'digi-text-img' &&
                                            <img src={`${publicStorageURL}/${upload.fileName}`} />
                                        }
                                        {/* {upload.textDetection === 'digi-text-pdf' &&
                                            <iframe src={`${publicStorageURL}/${upload.fileName}`} />
                                        } */}
                                    </span>
                                </Link>
                                <span className="item-card-body">
                                    <Link to={{ pathname: `/read/${upload._id}` }}>
                                        {splitFileName(upload.fileName)}
                                    </Link>
                                    <Moment 
                                        date={upload.createdAt}
                                        parse="YYYY-MM-DD"
                                        format="DD/MM/YYYY"
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            : (
                <strong>You have not uploaded any files.</strong>
            )}
        </>
    );
};

export default ItemsListGrid;