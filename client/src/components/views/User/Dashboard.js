import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import Button from '../../elements/Button';
import UploadsList from '../../elements/UploadsList';

const Dashboard = () => {
    const BASE_API_URL = 'http://localhost:4000/uploads';

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const login = () => history.push('/sign-in');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/');
    };

    const [userUpload, setUserUpload] = useState('');
    const [textDetection, setTextDetection] = useState('');
    const [selOptions] = useState([
        { label: 'Digital Text in Image', value: 'digi-text-img' },
        { label: 'Handwriting in Image', value: 'hndwrtng-img' },
        { label: 'Digital Text in PDF', value: 'digi-text-pdf' }
    ]);
    const [uploads, setUploads] = useState('');

    const onFileChange = (e) => {
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
            await axios({
                method: 'post',
                url: `${BASE_API_URL}/new`,
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

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        const getAllUploads = () => {
            axios.get(`${BASE_API_URL}/all`, {
                headers: {
                    'x-auth-token': token
                }
            }).then((response) => {
                const allUploads = response.data;
                setUploads(allUploads);
            }).catch(error => console.error(`Error: ${error}`));
        };
        getAllUploads();
    }, []);

    return (
        <>
            {userData.user ? (
                <main>
                    <button onClick={logout}>Sign Out</button>

                    <section className="upload-form-container">
                        <form
                            className="upload-form"
                            encType="multipart/form-data"
                            method="POST"
                            onSubmit={submit}
                        >
                            <h4>Upload File</h4>
                            <section className="form-fields">
                                <div className="form-group">
                                    <input 
                                        className="form-field"
                                        type="file"
                                        id="upload-file"
                                        name="file"
                                        aria-required="true"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="textDetection">Text Detection Type</label>
                                    <select
                                        className="form-select"
                                        id="textDetection"
                                        name="textDetection"
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
                                </div>
                            </section>
                            <Button
                                type="submit"
                                buttonStyle="btn-primary"
                                buttonSize="btn-md"
                            >
                                Upload
                            </Button>
                        </form>
                    </section>

                    <UploadsList uploads={uploads} />
                </main>
            ) : (
                <main>
                    You are not logged in.
                    <button onClick={login}>Sign In</button>
                </main>
            )}
        </>
    )
}

export default Dashboard;