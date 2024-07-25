import ReactDom from 'react-dom'
import { useContext } from "react";
import UploadContext from "../../context/UploadContext";

const ModalPortal = ({children}) => {

    const { dispatch } = useContext(UploadContext);

    // const togglePreviewState = (e) => {
    //     e.preventDefault();
    //     dispatch({
    //         type: 'SET_SHOW_PREVIEW',
    //         payload: false
    //     })
    // }


    return ReactDom.createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                {children}
            </div>
        </>,
        document.getElementById('preview-modal')
    );
};

export default ModalPortal;