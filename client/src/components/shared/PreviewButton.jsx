import { useContext } from "react";
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

    const buttonStyle = showPreview ? { position: 'absolute', top: '10px', right: '10px' , zIndex: 999, backgroundColor: 'transparent'} : {};

    return (

        <button 
            onClick={togglePreviewState} 
            style={buttonStyle}
            className="button"
            aria-expanded={showPreview}
            aria-label={showPreview ? 'Hide preview' : 'Show preview'}
        >
            {showPreview ? 'Hide' : 'Preview'}
            {showPreview ? <FaWindowClose aria-hidden="true" /> : <MdOutlinePreview size={19} aria-hidden="true" />}
        </button>
    );
};

export default PreviewButton;