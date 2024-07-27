import ReactDom from 'react-dom'

const ModalPortal = ({children}) => {

    return ReactDom.createPortal(
        <>
            <div
                className="modal-overlay"
                role="presentation"
                aria-hidden="true"
            ></div>
            <div className="modal" role="dialog">
                {children}
            </div>
        </>,
        document.getElementById('preview-modal')
    );
};

export default ModalPortal;