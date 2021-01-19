import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Dashboard() {
    const {userData} = useContext(UserContext);
    const [userUpload, setUserUpload] = useState('');
    const [textDetection, setTextDetection] = useState('');
    const [selOptions] = useState([
        { label: "Digital Text in Image", value: "digi-text-img" },
        { label: "Handwriting in Image", value: "hndwrtng-img" },
        { label: "Digital Text in PDF", value: "digi-text-pdf" }
    ]);

    const onFileChange = e => {
        setUserUpload(e.target.files[0]);
    }

    const onSelectChange = (e) => {
        setTextDetection(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('textDetection', textDetection);
        formData.append('file', userUpload);
        console.log(formData.get('file'));
        console.log(formData.get('textDetection'));

        const token = localStorage.getItem('auth-token');

        try {
            await Axios({
                method: 'post',
                url: 'http://localhost:4000/files/new',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            })
            .then((response) => {
                console.log(response);
            });
        } catch (error) {
            console.error(error);
        }
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

                        <label htmlFor="textDetection">Text Detection Type</label>
                        <select 
                            name="textDetection" 
                            id="textDetection"
                            value={textDetection}
                            onChange={onSelectChange}
                        >
                            <option></option>
                            {selOptions.map(selOption => (
                                <option
                                    key={selOption.value}
                                    value={selOption.value}
                                >
                                    {selOption.label}
                                </option>
                            ))}
                        </select>

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