import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Dashboard() {
    const {userData} = useContext(UserContext);
    const [userUpload, setUserUpload] = useState('');

    const onFileChange = e => {
        setUserUpload(e.target.files[0]);
    }

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', userUpload);
        //console.log(formData.get('file'));

        const token = localStorage.getItem('auth-token');
        const headers = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        }
        //console.log(headers);

        await Axios.post(
            'http://localhost:4000/files/new',
            formData,
            { headers }
        ).then((res) => {
            console.log("File stored in bucket and db");
        }).catch((error) => {
            console.error(error);
        });  
    }
    
    return (
        <>
            {userData.user ? (
                <div className="page">
                    <h1>Upload File</h1>
                    <form 
                        className="form" 
                        encType="multipart/form-data" 
                        method="POST" 
                        onSubmit={submit}
                    >
                        <input 
                            name="user-upload" 
                            type="file" 
                            onChange={onFileChange}
                        />
                        <input type="submit" value="Upload" />
                    </form>
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