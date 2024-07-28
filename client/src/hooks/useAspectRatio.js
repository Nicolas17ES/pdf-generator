import { useState, useEffect } from "react";

const useAspectRatio = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);


    useEffect(() => {

        if (aspectRatio !== null) {

            const containerSize = screenWidth < 600 ? 300 : 500;
            const minTextHeight = screenWidth < 600 ? 50 : 80;

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
    }, [aspectRatio, screenWidth]);

    return { dimensionsImageOne, dimensionsImageTwo, aspectRatio, isLoading, handleImageLoad };
};

export default useAspectRatio;