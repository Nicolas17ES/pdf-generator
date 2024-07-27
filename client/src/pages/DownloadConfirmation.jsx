import UploadContext from "../context/UploadContext";
import {Link} from 'react-router-dom';
import { useEffect } from "react";

function DownloadConfirmation() {

    const { dispatch } = useContext(UploadContext);

    useEffect(() => {
        return () => {
            dispatch({
                type: 'RESET_STATE'
            })
        }
    }, []);

    return (
        <section className="page-container">
            <h2 className="confirmation-title title">Your PDF has been downloaded</h2>
            <p className="confirmation-paragraph subtitle">Thank you for using Mesplaques. Would you like to try again?</p>
            <div className="buttons-container" style={{ marginTop: '100px' }}>
                <Link to='/' className="confirmation-button button" aria-label="Try the process again">Try again</Link>
                <a href="https://www.mesplaques.fr/" className="confirmation-button button" aria-label="Visit Mesplaques website">Visit Mesplaques</a>
            </div>
        </section>
    );

}

export default DownloadConfirmation;