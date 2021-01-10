import React, {useContext, useCallback} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import {useDropzone} from "react-dropzone";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {Files, filesQuery} from "./Files";

const uploadFileMutation = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;

export const Dashboard = () => {
    const {userData} = useContext(UserContext);

    const [uploadFile] = useMutation(uploadFileMutation, {
        refetchQueries: [{query: filesQuery}]
    });

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({variables: {file}});
        },
        [uploadFile]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <>
            {userData.user ? (
                <div className="page" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag and drop some files here, or click to select files</p>
                    )}
                    <Files />
                </div>
            ) : (
                <div className="page">
                    <h2>You are not logged in.</h2>
                    <Link to="/login">Log In</Link>
                </div>
            )}
        </>
    );
}