import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { BiShow, BiTrash } from 'react-icons/bi';

const ItemsList = (props) => {
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
        <section className="user-uploads">
            {uploads.length > 0 ?
                <table className="uploads-table">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Type</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploads.map((upload) => (
                            <tr key={upload._id}>
                                <td>
                                    <Link to={{
                                        pathname: `/read/${upload._id}`
                                    }}>
                                        {splitFileName(upload.fileName)}
                                    </Link>
                                </td>
                                <td>
                                    {uploadType(upload.textDetection)}
                                </td>
                                <td>
                                    <Moment 
                                        date={splitDate(upload.createdAt)}
                                        parse="YYYY-MM-dd"
                                        format="DD MMM YYYY"
                                    />
                                </td>
                                <td>
                                    <Link 
                                        to={{
                                            pathname: `/read/${upload._id}`
                                        }}
                                        className="action-link"
                                    >
                                        <BiShow className="action-icon" />
                                        <strong className="action-name">View</strong>
                                    </Link>
                                    <Link 
                                        to={{
                                            pathname: `/`
                                        }}
                                        className="action-link"
                                    >
                                        <BiTrash className="action-icon" />
                                        <strong className="action-name">Delete</strong>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            : (
                <p>You have not uploaded any files.</p>
            )}
        </section>
    );
};

export default ItemsList;