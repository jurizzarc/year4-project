import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const UploadsList = (props) => {
    const uploads = props.uploads;

    const splitFileName = (str) => {
        return str.substring(0, str.indexOf('_'));
    };

    const splitDate = (str) => {
        return str.substring(0, str.indexOf('T'));
    };

    return (
        <section className="user-uploads">
            <h2>Library</h2>
            {uploads.length > 0 ? 
                <table className="user-uploads">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Date Created</th>
                            <th>Detection Type</th>
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
                                    <Moment 
                                        date={splitDate(upload.createdAt)}
                                        parse="YYYY-MM-dd"
                                        format="DD MMM YYYY"
                                    />
                                </td>
                                <td>{upload.textDetection}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            : (
                <p>You have not uploaded any files.</p>
            )}
        </section>
    )
}

export default UploadsList;