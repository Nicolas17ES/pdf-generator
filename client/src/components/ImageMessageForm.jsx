import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import {uploadImage} from '../context/UploadActions'
import Preview from './Preview'
import { toast } from 'react-toastify';


function ImageMessageForm() {

    const {dispatch} = useContext(UploadContext);

    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [blob, setBlob] = useState(null);
    const [previewIsReady, setPreviewIsReady] = useState(false);


    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 1) {
            toast.error('Please select only one file.');
            e.target.value = null; // Clear the file input
            return;
        }

        const files = files[0];

        setImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            toast.info('Image ready for preview');
            setBlob(reader.result);
            setPreviewIsReady(true);
        };

        reader.onerror = () => {
            toast.error('Error loading image. Please try again.');
        };

        reader.readAsDataURL(file);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('message', message);
        formData.append('image', image);
        uploadImage(dispatch, formData)
    };


    return (

        <>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => {
                        if (e.target.value.length <= 50) {
                            setMessage(e.target.value);
                        } else {
                            toast.error('Message cannot exceed 50 characters.');
                        }
                    }}
                    placeholder="Enter your text"
                    name="message"
                    maxLength="50"
                    required
                />
                <label htmlFor="file-upload" className="file-upload-label">
                        Upload an image:
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    aria-describedby="file-upload-feedback"
                    name="image"
                    multiple={false}
                    required
                />
                <button disabled={!previewIsReady} className="button" type="submit">Submit</button>
            </form>
            <button onClick={() => setShowPreview(true)} disabled={!previewIsReady} className="button">Preview</button>
            {showPreview && <Preview message={message} image={blob} /> }
        </>

    );

}

export default ImageMessageForm;