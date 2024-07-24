import { useState, useContext } from "react";
import UploadContext from "../../context/UploadContext";
import { MdOutlinePreview } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";


const PreviewButton = () => {

    const { dispatch, showPreview } = useContext(UploadContext);

    const togglePreviewState = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SET_SHOW_PREVIEW',
            payload: !showPreview
        })
    }

    const buttonStyle = showPreview ? { position: 'absolute', top: '10px', right: '10px' , zIndex: 999} : {};

    return (

        <button 
            onClick={togglePreviewState} 
            style={buttonStyle}
            // disabled={!isPreviewReady} 
            className="button">
                {showPreview ? 'Hide' : 'Preview'}
            {showPreview ? <FaWindowClose /> : <MdOutlinePreview size={19}/>}
        </button>
    );
};

export default PreviewButton;