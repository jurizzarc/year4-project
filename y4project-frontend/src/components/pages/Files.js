import React from "react";

export default function Files(props) {
    const displayFiles = (props) => {
        const uploads = props.uploads;
        
        if (uploads.length > 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Detection Type</th>
                        </tr>
                    </thead>
                    {uploads.map((upload) => (
                        <tbody>
                            <tr key={upload._id}>
                                <td>{upload.fileName}</td>
                                <td>{upload.textDetection}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            )
        } else {
            return (
                <p>No uploads yet.</p>
            )
        }
    }

    return (
        <div>
            <h2>Library</h2>
            {displayFiles(props)}
        </div>
    );
}