import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import {uploadImage} from '../context/UploadActions'
import Preview from './Preview'
import { toast } from 'react-toastify';
import  ModalPortal from './shared/ModalPortal'
import PreviewButton from './shared/PreviewButton'
import TextArea from './shared/TextArea'

function ImageMessageForm() {

    const { dispatch, showPreview} = useContext(UploadContext);

    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [blob, setBlob] = useState(null);
    const [previewIsReady, setPreviewIsReady] = useState(false);


    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length > 1) {
            toast.error('Please select only one file.');
            e.target.value = null; // Clear the file input
            return;
        }

        const file = files[0];

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
        formData.append('name', image.name);
        uploadImage(dispatch, formData)
    };


    return (

        <>
            <form className="form-container" onSubmit={handleSubmit}>

                <TextArea onChange={setMessage} value={message} maxLength={50}/>

                <label htmlFor="file-upload" className="file-upload-label">
                        Upload an image:
                </label>

                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    aria-describedby="file-upload-feedback"
                    name="image"
                    multiple={false}
                    required
                />

                <button disabled={!previewIsReady} className="button" type="submit">Submit</button>

            </form>

            {previewIsReady && <PreviewButton />}

            {showPreview && (
                <ModalPortal>
                    <Preview message={message} image={blob} />
                </ModalPortal>
            )}
        </>

    );

}

export default ImageMessageForm;