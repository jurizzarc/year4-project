import React from 'react';
import { Link } from 'react-router-dom';

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
                                    {splitFileName(upload.fileName)}
                                </Link>
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