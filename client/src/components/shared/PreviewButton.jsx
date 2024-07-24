import { useState, useContext } from "react";
import UploadContext from "../../context/UploadContext";

const PreviewButton = () => {

    const { dispatch, showPreview } = useContext(UploadContext);

    const togglePreviewState = () => {
        dispatch({
            type: 'SET_SHOW_PREVIEW',
            payload: !showPreview
        })
    }

    return (

        <button 
            onClick={togglePreviewState} 
            // disabled={!isPreviewReady} 
            className="button">
                {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
    );
};

export default PreviewButton;