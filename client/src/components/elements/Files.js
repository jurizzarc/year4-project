import React from 'react';
import { Link } from 'react-router-dom';

export default function Files(props) {
    const uploads = props.uploads;
    
    return (
        <>
            <h2>Library</h2>
            {uploads.length > 0 ? 
                <table className="user-uploads">
                    <thead>
                        <tr>
                            <th>File Name</th>
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
                                        {upload.fileName}
                                    </Link>
                                </td>
                                <td>{upload.textDetection}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            : (
                <p>You have not uploaded any files.</p>
            )}
        </>
    )
}