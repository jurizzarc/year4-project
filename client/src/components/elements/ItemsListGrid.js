import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ItemsListGrid = (props) => {
    const uploads = props.uploads;
    const sortedUploads = [...uploads];
    const [sortedField, setSortedField] = useState('');
    console.log(sortedField);
    if (sortedField !== null) {
        sortedUploads.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                return -1;
            }
            if (a[sortedField] > b[sortedField]) {
                return 1;
            }
            return 0; 
        });
    }

    const onSelectChange = (e) => {
        setSortedField(e.target.value);
    };

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

    const publicStorageURL = 'https://storage.googleapis.com/clear-reading-app-uploads';

    return (
        <>
            {/* <div className="filters">
                <div className="filters-wrapper">
                    <div className="search-field">
                        <input 
                            id="searchUploads"
                            type="text"
                            className="form-control"
                            aria-label="Search Uploads"
                            placeholder="Search by file name"
                        />
                    </div>
                    <div className="sort-select">
                        <strong>Sort by</strong>
                        <select
                            id="sort-field"
                            name="sortUploads"
                            value={sortedField}
                            onChange={onSelectChange}
                        >
                            <option></option>
                            <option
                                key="fileName"
                                value="fileName"
                            >
                                File Name
                            </option>
                            <option
                                key="createdAt"
                                value="createdAt"
                            >
                                Date Uploaded
                            </option>
                        </select>
                    </div>
                </div>
            </div> */}
            {uploads.length > 0 ?
                <ul className="grid">
                    {uploads.map((upload) => (
                        <li 
                            className="card"
                            key={upload._id}
                        >
                            <div className="card-img">
                                <Link to={{ pathname: `/read/${upload._id}` }}>
                                    {upload.textDetection === 'hndwrtng-img' &&
                                        <img src={`${publicStorageURL}/${upload.fileName}`} />
                                    }
                                    {upload.textDetection === 'digi-text-img' &&
                                        <img src={`${publicStorageURL}/${upload.fileName}`} />
                                    }
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
            : (
                <strong>You have not uploaded any files.</strong>
            )}
        </>
    );
};

export default ItemsListGrid;