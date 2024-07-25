import { useState, useContext, useEffect } from "react";
import UploadContext from "../context/UploadContext";
import { uploadImage } from '../context/UploadActions';
import Preview from './Preview';
import { toast } from 'react-toastify';
import ModalPortal from './shared/ModalPortal';
import PreviewButton from './shared/PreviewButton';
import TextArea from './shared/TextArea';
import { IoIosSend } from "react-icons/io";

function ImageMessageForm() {
    const { dispatch, showPreview, selectedImage } = useContext(UploadContext);
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
                <div className="buttons-container">
                    <button disabled={!previewIsReady} className="button" type="submit">
                        Submit <IoIosSend size={19} />
                    </button>
                    {previewIsReady && <PreviewButton />}
                </div>
            </form>

            {showPreview && (
                <ModalPortal>
                    <Preview  message={message} image={blob} name={image.name} type={image.type} />
                </ModalPortal>
            )}
        </>
    );
}

export default ImageMessageForm;
