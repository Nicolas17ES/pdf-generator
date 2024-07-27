import { useState, useContext, useEffect } from "react";
import UploadContext from "../context/UploadContext";
import { uploadImage } from '../context/UploadActions';
import Preview from './Preview';
import { toast } from 'react-toastify';
import ModalPortal from './shared/ModalPortal';
import PreviewButton from './shared/PreviewButton';
import TextArea from './shared/TextArea';

function ImageMessageForm() {
    const { dispatch, showPreview, selectedImage } = useContext(UploadContext);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [blob, setBlob] = useState(null);
    const [previewIsReady, setPreviewIsReady] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files;

        if (files.length === 0) {
            // If no file is selected (cancelled file selection)
            setImage(null);
            setBlob(null);
            setPreviewIsReady(false);
            return;
        }

        if (files.length > 1) {
            toast.error('Please select only one file.');
            e.target.value = null;
            return;
        }

        const file = files[0];
        setImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {
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
        formData.append('image', selectedImage);
        formData.append('name', image.name);
        uploadImage(dispatch, formData);
    };

    useEffect(() => {
        return () => {
            setBlob(null);
            setMessage('');
            setImage(null);
            setPreviewIsReady(false);
        }
    }, []);

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <TextArea onChange={setMessage} value={message} maxLength={25} />
                <h4 className="upload-label">2) select your image</h4>
                <label htmlFor="file-upload" className="file-upload-label">choose file</label>
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    aria-describedby="file-upload-feedback"
                    name="image"
                    multiple={false}
                    required
                />
                {image && <small className="file-name" id="file-upload-feedback">{image.name}</small>}
                <hr style={{ marginBottom: '50px' }} />
                {(previewIsReady && message.length > 0) && <PreviewButton />}
            </form>

            {showPreview && (
                <ModalPortal>
                    <Preview message={message} image={blob} name={image.name} type={image.type} />
                </ModalPortal>
            )}
        </>
    );
}

export default ImageMessageForm;