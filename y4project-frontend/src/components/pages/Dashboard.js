import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {Files, filesQuery} from "./Files";

const uploadFileMutation = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;

export default function Dashboard() {
    const {userData} = useContext(UserContext);

    const [uploadFile] = useMutation(uploadFileMutation, {
        refetchQueries: [{
            query: filesQuery
        }]
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return
        uploadFile({
            variables: {
                file
            }
        });
    }
    
    return (
        <>
            {userData.user ? (
                <div className="page">
                    <h1>Upload File</h1>
                    <input type="file" onChange={handleFileChange} />
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