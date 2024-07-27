import React from "react";

const ImagePreview = React.forwardRef(({ image, message, dimensions, onLoad, loadingState, option }, ref) => (
    
    <div
        className={`preview-container preview-container-${option}`}
        style={{ display: loadingState ? 'none' : 'block' }}
        role="region"
        aria-label={`Image preview container, option ${option}`}
    >
        <img
            className="image"
            src={image}
            alt="Preview Image"
            ref={ref}
            style={{ width: `${dimensions.imageWidth}px`, height: `${dimensions.imageHeight}px`, objectFit: 'cover' }}
            onLoad={onLoad}
        />
        <div className="image-text-container" style={{ height: `${dimensions.textHeight}px` }}>
            <p className="image-text">{message}</p>
        </div>
    </div>
));

export default ImagePreview;
