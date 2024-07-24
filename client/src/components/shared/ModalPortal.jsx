import ReactDom from 'react-dom'

const ModalPortal = ({children}) => {
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