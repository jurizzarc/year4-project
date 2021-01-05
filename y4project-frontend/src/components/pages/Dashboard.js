import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {filesQuery} from "./Files";

const uploadFileMutation = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;

export const Dashboard = () => {
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
        <div className="page" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag and drop some files here, or click to select files</p>
            )}
        </div>
    );
}