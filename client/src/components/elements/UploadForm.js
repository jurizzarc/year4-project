import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BiPlus } from 'react-icons/bi';
import Button from '../elements/Button';
import Modal from '../elements/Modal';

const UploadForm = () => {
    const BASE_API_URL = 'http://localhost:4000/uploads';
    // const BASE_API_URL = 'https://clear-server.herokuapp.com/uploads';
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [userUpload, setUserUpload] = useState('');
    const [textDetection, setTextDetection] = useState('');
    const [hasHandwritingSystem, setHasHandwritingSystem] = useState('');
    const [selOptions] = useState([
        { label: 'Digital Text in Image', value: 'digi-text-img' },
        { label: 'Handwriting in Image', value: 'hndwrtng-img' },
        { label: 'Digital Text in PDF', value: 'digi-text-pdf' }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFileChange = (e) => {
        setUserUpload(e.target.files[0]);
    };

    const onSelectChange = (e) => {
        setTextDetection(e.target.value);
    };

    const strToBool = (value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    };

    const onRadioChange = (e) => {
        setHasHandwritingSystem(strToBool(e.target.value));
    };

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let formData = new FormData();
        formData.append('hasHandwritingSystem', hasHandwritingSystem);
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
                console.log(response.data);
                const uploadId = response.data._id;
                history.push(`/read/${uploadId}`);
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Button
                buttonId="upload-modal-btn"
                type="button"
                buttonStyle="btn-primary"
                buttonSize="btn-md"
                onClick={
                    () => setIsModalVisible(true)
                }
            >
                <BiPlus className="button-icon" />Upload
            </Button>
            {isModalVisible && (
                <Modal
                    modalId="upload-form-modal"
                    modalSize="modal-md"
                    modalPosition="modal-centre"
                    onModalClose={
                        () => setIsModalVisible(false)
                    }
                >
                    <Modal.Header>Upload File</Modal.Header>
                    <Modal.Body>
                        {isSubmitting ? (
                            <p>Extracting text from the file...</p>
                        ) : (
                            <form
                                className="upload-form"
                                encType="multipart/form-data"
                                method="POST"
                                onSubmit={submit}
                            >
                                <div className="modal-form-group">
                                    <label htmlFor="uploadFile">Document or Image</label>
                                    <input 
                                        className="form-field"
                                        type="file"
                                        id="uploadFile"
                                        name="uploadFile"
                                        aria-required="true"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <div className="modal-form-group">
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
                                {textDetection === 'hndwrtng-img' &&
                                    <div className="modal-form-group">
                                        <label htmlFor="hasHandwritingSystem">Follows a handwriting system</label>
                                        <input 
                                            type="radio"
                                            name="hasHandwritingSystemTrue"
                                            id="hasHandwritingSystemTrue"
                                            value="true"
                                            onChange={onRadioChange}
                                        />
                                        <label 
                                            className="radio-label" 
                                            htmlFor="hasHandWritingSystemTrue"
                                        >
                                            Yes
                                        </label>
                                        <input 
                                            type="radio"
                                            name="hasHandwritingSystemFalse"
                                            id="hasHandwritingSystemFalse"
                                            value="false"
                                            onChange={onRadioChange}
                                        />
                                        <label 
                                            className="radio-label" 
                                            htmlFor="hasHandwritingSystemFalse"
                                        >
                                            No
                                        </label>
                                    </div>
                                }
                                <Button
                                    type="sugmit"
                                    buttonStyle="btn-primary"
                                    buttonSize="btn-md"
                                >
                                    Upload
                                </Button>
                            </form>
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default UploadForm;