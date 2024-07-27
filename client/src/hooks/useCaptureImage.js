import { useState } from "react";
import * as htmlToImage from 'html-to-image';
import {uploadImage} from '../context/UploadActions'

const useCaptureImage = (dispatch, name) => {
    const [capturedImage, setCapturedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let element = capturedImage ? capturedImage : document.querySelector('.preview-container');

        if (element) {
            try {
                const dataUrl = await htmlToImage.toPng(element, {
                    backgroundColor: undefined,
                    width: 500,
                    height: 500,
                    quality: 0.8
                });

                if (dataUrl) {
                    const response = await fetch(dataUrl);
                    const blob = await response.blob();
                    const file = new File([blob], name, { type: 'image/png' });

                    const formData = new FormData();
                    formData.append('image', file);
                    formData.append('name', name);

                    uploadImage(dispatch, formData);
                    dispatch({ type: 'SET_SHOW_PREVIEW', payload: false });
                }

            } catch (error) {
                console.error("Error capturing image:", error);
            }
        }
    };

    const handleSelectImage = (imageNumber) => {
        const container = imageNumber === 1 ? document.querySelector('.preview-container-one') : document.querySelector('.preview-container-two');
        setCapturedImage(container);
    };

    return { handleSubmit, handleSelectImage, capturedImage };
};

export default useCaptureImage;
