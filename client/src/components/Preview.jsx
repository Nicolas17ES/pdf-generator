import { useContext, useRef } from "react";
import UploadContext from "../context/UploadContext";
import { IoIosSend } from "react-icons/io";
import useAspectRatio from "../hooks/useAspectRatio";
import useCaptureImage from "../hooks/useCaptureImage";
import LoadingIndicator from './shared/LoadingIndicator';
import SelectImageButton from './shared/SelectImageButton';
import ImagePreview from './shared/ImagePreview';
import useLanguageFile from '../hooks/useLanguageFile';


const Preview = ({ message, image, name }) => {

    const { dispatch } = useContext(UploadContext);

    const content = useLanguageFile('preview');

    const imageRefOne = useRef(null);
    const imageRefTwo = useRef(null);

    const { dimensionsImageOne, dimensionsImageTwo, aspectRatio, isLoading, handleImageLoad } = useAspectRatio();
    const { capturedImage, handleSubmit, handleSelectImage } = useCaptureImage(dispatch, name);

    if (!content) {
        return null;
    }

    return (
        <>
            {aspectRatio > 1 ? <h2 className="title">{content.title}</h2> : null}
            <div className="preview-images-container">
                {isLoading ? <LoadingIndicator /> : null}
                <section className="image-container" aria-labelledby="image-one-label">
                    <ImagePreview
                        loadingState={isLoading}
                        image={image}
                        message={message}
                        dimensions={dimensionsImageOne}
                        ref={imageRefOne}
                        onLoad={() => handleImageLoad(imageRefOne)}
                        option={'one'}
                    />
                    {aspectRatio > 1 && !capturedImage &&
                        <SelectImageButton onClick={() => handleSelectImage(1)} text={content.opt_one} aria-label="Select image option one"/>
                    }
                </section>

                {aspectRatio > 1 && (
                    <section className="image-container" aria-labelledby="image-two-label">
                        <ImagePreview
                            image={image}
                            message={message}
                            dimensions={dimensionsImageTwo}
                            ref={imageRefTwo}
                            onLoad={() => handleImageLoad(imageRefTwo)}
                            option={'two'}
                        />
                        {aspectRatio > 1 && !capturedImage &&
                            <SelectImageButton onClick={() => handleSelectImage(2)} text={content.opt_two} aria-label="Select image option two"/>
                        }
                    </section>
                )}
            </div>
            {(aspectRatio <= 1 || (aspectRatio > 1 && capturedImage)) && (
                <button
                    onClick={handleSubmit}
                    className="button button-submit"
                    aria-label="Submit form"
                >
                    {content.button} <IoIosSend size={19} />
                </button>
            )}
        </>
    );
};

export default Preview;


