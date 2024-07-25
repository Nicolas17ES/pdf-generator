import { useEffect, useRef, useState, useContext } from "react";
import html2canvas from "html2canvas";
import UploadContext from "../context/UploadContext";

const Preview = ({ message, image, name, type }) => {

    const { dispatch } = useContext(UploadContext);

    const [isLoading, setIsLoading] = useState(true);
    const [aspectRatio, setAspectRatio] = useState(null);

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


    const captureImage = async (element) => {
        if (element) {
            try {
                // Capture the element as a canvas
                const canvas = await html2canvas(element);

                // Convert the canvas to a Data URL with the image type
                const dataURL = canvas.toDataURL(type);

                // Fetch the Data URL and convert it to a Blob
                const blob = await (await fetch(dataURL)).blob();

                // Create a File object from the Blob
                const file = new File([blob], name, { type: type });
                // Dispatch the File object to the parent component
                dispatch({
                    type: 'SET_SELECTED_IMAGE',
                    payload: file,
                });

                dispatch({
                    type: 'SET_SHOW_PREVIEW',
                    payload: false
                });

                // You can now send `dataURL` to the backend or do other operations with it
            } catch (error) {
                console.error("Error capturing image:", error);
            }
        }
    };

    const handleSelectImage = (imageNumber) => {

        if (imageNumber === 1) {
            captureImage(imageRefOne.current.parentElement); // Capture the image container for image one
        } else if (imageNumber === 2) {
            captureImage(imageRefTwo.current.parentElement); // Capture the image container for image two
        }

    };


    return (
        <>
            {aspectRatio > 1 &&
                <h1 className="title">Select an option</h1>
            }
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
                        <div
                            className="image-text-container"
                            style={{ height: `${textHeightOptionOne}px` }}
                        >
                            <p className="image-text">{message}</p>
                        </div>
                    </div>
                    {aspectRatio > 1 &&
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
                            <div
                                className="image-text-container"
                                style={{ height: `${textHeightOptionTwo}px` }}
                            >
                                <p className="image-text">{message}</p>
                            </div>
                        </div>
                        { aspectRatio > 1 &&
                            <button onClick={() => handleSelectImage(2)} className="button select-image-button">
                                Image Two
                            </button>
                        }
                    </section>
                )}
            </div>
        </>
    );
};

export default Preview;


