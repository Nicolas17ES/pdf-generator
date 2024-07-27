import { useState, useEffect } from "react";

const useAspectRatio = () => {
    const [aspectRatio, setAspectRatio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dimensionsImageOne, setDimensionsImageOne] = useState({ imageHeight: 0, imageWidth: 0, textHeight: 100 });
    const [dimensionsImageTwo, setDimensionsImageTwo] = useState({ imageHeight: 0, imageWidth: 0, textHeight: 100 });

    const handleImageLoad = (imageRef) => {
        if (imageRef && imageRef.current) {
            const { naturalWidth, naturalHeight } = imageRef.current;
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

            setDimensionsImageOne({
                imageHeight: adjustedImageHeightOptionOne,
                imageWidth: adjustedImageWidthOptionOne,
                textHeight: containerSize - adjustedImageHeightOptionOne
            });

            // OPTION2

            if (aspectRatio > 1) {
                adjustedImageWidthOptionTwo = containerSize;
                adjustedImageHeightOptionTwo = containerSize;

                const textHeightOptionTwo = Math.min(adjustedImageHeightOptionTwo, minTextHeight);
                adjustedImageHeightOptionTwo -= textHeightOptionTwo;

                setDimensionsImageTwo({
                    imageHeight: adjustedImageHeightOptionTwo,
                    imageWidth: adjustedImageWidthOptionTwo,
                    textHeight: textHeightOptionTwo
                });

            }

        }
    }, [aspectRatio]);

    return { dimensionsImageOne, dimensionsImageTwo, aspectRatio, isLoading, handleImageLoad };
};

export default useAspectRatio;