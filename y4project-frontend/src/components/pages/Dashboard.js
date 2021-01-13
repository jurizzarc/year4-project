import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {filesQuery} from "./Files";
import Axios from "axios";

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

    const onFileChange = (e) => {
        // Get file uploaded by the user
        const file = e.target.files[0];
        const fileName = file.name;
        const userId = userData.user.id;
        const token = localStorage.getItem("auth-token");

        const newFile = {
            fileName,
            userId
        };

        const headers = {
            'x-auth-token': token
        }

        // console.log(newFile);
        console.log(headers);

        Axios.post("http://localhost:4000/files/new", newFile, { headers })
             .then((res) => {
                 console.log(res.data);
                 console.log("File stored in the db");
             })
             .catch((error) => {
                 console.error(error)
             });

        console.log("File stored in cloud storage");

        if (!file) return;
        // Call mutation to upload file to the server
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
                    <input type="file" onChange={onFileChange} />
                    {/* <Files /> */}
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