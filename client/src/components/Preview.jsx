import { useEffect, useRef, useState, useContext } from "react";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import UploadContext from "../context/UploadContext";
import { uploadImage } from '../context/UploadActions';
import { IoIosSend } from "react-icons/io";

const Preview = ({ message, image, name }) => {
    const { dispatch } = useContext(UploadContext);
    const [isLoading, setIsLoading] = useState(true);
    const [aspectRatio, setAspectRatio] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [imageHeightOptionOne, setImageHeightOptionOne] = useState(0);
    const [imageWidthOptionOne, setImageWidthOptionOne] = useState(0);
    const [textHeightOptionOne, setTextHeightOptionOne] = useState(100);
    const [imageHeightOptionTwo, setImageHeightOptionTwo] = useState(0);
    const [imageWidthOptionTwo, setImageWidthOptionTwo] = useState(0);
    const [textHeightOptionTwo, setTextHeightOptionTwo] = useState(100);

    const imageRefOne = useRef();
    const imageRefTwo = useRef();
    const previewContainerRefOne = useRef();
    const previewContainerRefTwo = useRef();

    const handleImageLoad = () => {
        if (imageRefOne.current) {
            const { naturalWidth, naturalHeight } = imageRefOne.current;
            if (naturalWidth && naturalHeight) {
                setAspectRatio(naturalWidth / naturalHeight);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (aspectRatio !== null) {
            const containerSize = 500;
            const minTextHeight = 80;

            let adjustedImageHeightOptionOne, adjustedImageWidthOptionOne;
            let adjustedImageWidthOptionTwo, adjustedImageHeightOptionTwo;

            // OPTION 1
            adjustedImageWidthOptionOne = containerSize;
            adjustedImageHeightOptionOne = containerSize / aspectRatio;

            const remainingHeight = containerSize - adjustedImageHeightOptionOne;
            if (remainingHeight < minTextHeight) {
                adjustedImageHeightOptionOne = containerSize - minTextHeight;
            }
            setImageHeightOptionOne(adjustedImageHeightOptionOne);
            setImageWidthOptionOne(adjustedImageWidthOptionOne);
            setTextHeightOptionOne(containerSize - adjustedImageHeightOptionOne);

            if (aspectRatio > 1) {
                adjustedImageWidthOptionTwo = containerSize;
                adjustedImageHeightOptionTwo = containerSize;

                const textHeightOptionTwo = Math.min(adjustedImageHeightOptionTwo, minTextHeight);
                adjustedImageHeightOptionTwo -= textHeightOptionTwo;

                setTextHeightOptionTwo(textHeightOptionTwo);
                setImageHeightOptionTwo(adjustedImageHeightOptionTwo);
                setImageWidthOptionTwo(adjustedImageWidthOptionTwo);
            }
        }
    }, [aspectRatio]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let element = capturedImage ? capturedImage : imageRefOne.current.parentElement;

        if (element) {
            try {
                // Capture the element with html-to-image
                const dataUrl = await htmlToImage.toPng(element, {
                    backgroundColor: undefined, // No explicit background color
                    width: 500, // Adjust width if needed
                    height: 500, // Adjust height if needed
                    quality: 0.1 // Adjust quality (0.0 to 1.0) if needed
                });

                if (dataUrl) {
                    // Convert base64 data URL to a Blob
                    const response = await fetch(dataUrl);
                    const blob = await response.blob();

                    // Convert Blob to File
                    const file = new File([blob], name, { type: 'image/png' });
                    // Prepare and send the image
                    const formData = new FormData();
                    formData.append('image', file);
                    console.log(name)
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
        if (imageNumber === 1) {
            setCapturedImage(previewContainerRefOne.current); // Capture the image container for image one
        } else if (imageNumber === 2) {
            setCapturedImage(previewContainerRefTwo.current); // Capture the image container for image two
        }
    };

    return (
        <>
            {aspectRatio > 1 && <h1 className="title">Select an option</h1>}
            <div className="preview-images-container">
                {isLoading && <div className="loader">Loading...</div>}
                <section className="image-container">
                    <div className="preview-container" ref={previewContainerRefOne} style={{ display: isLoading ? 'none' : 'block' }}>
                        <img
                            ref={imageRefOne}
                            className="image"
                            src={image}
                            alt="Preview"
                            onLoad={handleImageLoad}
                            style={{ width: `${imageWidthOptionOne}px`, height: `${imageHeightOptionOne}px`, objectFit: 'cover' }}
                        />
                        <div className="image-text-container" style={{ height: `${textHeightOptionOne}px` }}>
                            <p className="image-text">{message}</p>
                        </div>
                    </div>
                    {aspectRatio > 1 && !capturedImage &&
                        <button onClick={() => handleSelectImage(1)} className="button select-image-button">
                            Image One
                        </button>
                    }
                </section>

                {aspectRatio > 1 && (
                    <section className="image-container">
                        <div className="preview-container" ref={previewContainerRefTwo} style={{ display: isLoading ? 'none' : 'block' }}>
                            <img
                                ref={imageRefTwo}
                                className="image"
                                src={image}
                                alt="Preview"
                                onLoad={handleImageLoad}
                                style={{ width: `${imageWidthOptionTwo}px`, height: `${imageHeightOptionTwo}px`, objectFit: 'cover' }}
                            />
                            <div className="image-text-container" style={{ height: `${textHeightOptionTwo}px` }}>
                                <p className="image-text">{message}</p>
                            </div>
                        </div>
                        {aspectRatio > 1 && !capturedImage &&
                            <button onClick={() => handleSelectImage(2)} className="button select-image-button">
                                Image Two
                            </button>
                        }
                    </section>
                )}
            </div>
            {aspectRatio <= 1 ? (
                <button onClick={handleSubmit} className="button button-submit">
                    Submit <IoIosSend size={19} />
                </button>
            ) : (aspectRatio > 1 && capturedImage) && (
                <button onClick={handleSubmit} className="button button-submit">
                    Submit <IoIosSend size={19} />
                </button>
            )}
        </>
    );
};

export default Preview;
