import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import {uploadImage} from '../context/UploadActions'
import Preview from './Preview'
function ImageMessageForm() {

    const {dispatch} = useContext(UploadContext);

    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [blob, setBlob] = useState(null);
    const [previewIsReady, setPreviewIsReady] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setBlob(reader.result);
            setPreviewIsReady(true);
            setFeedback('Image ready for preview.');
        };
        reader.onerror = () => {
            setFeedback('Error loading image. Please try again.');
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
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your text"
                    name="message"
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
                    required
                />
                <button disabled={!previewIsReady} className="button" type="submit">Submit</button>
            </form>
            <button onClick={() => setShowPreview(true)} disabled={!previewIsReady} className="button">Preview</button>
            {previewIsReady && <p id="file-upload-feedback" aria-live="polite">{feedback}</p> }
            {showPreview && <Preview message={message} image={blob} /> }
        </>

    );

}

export default ImageMessageForm;