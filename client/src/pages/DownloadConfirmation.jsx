import UploadContext from "../context/UploadContext";
import {Link, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useContext } from "react";
import useLanguageFile from '../hooks/useLanguageFile';

function DownloadConfirmation() {

    const { dispatch, language } = useContext(UploadContext);

    const content = useLanguageFile('confirmation');

    const navigate = useNavigate();

    const handleButtonClick = () => {

        navigate('/');

        dispatch({
            type: 'RESET_STATE'
        })

    }

    if (!content) {
        return null;
    }

    return (
        <>
            <Helmet>
                <meta name="description" content="Your PDF has been successfully downloaded. Thank you for using Mesplaques. Would you like to generate another PDF?" />
                <title>Confirmation</title>
            </Helmet>
            <section className="page-container">
                <h2 className="confirmation-title title">{content.title}</h2>
                <p className="confirmation-paragraph subtitle">{content.paragraph}</p>
                <div className="buttons-container" style={{ marginTop: '100px' }}>
                <button onClick={handleButtonClick} className="confirmation-button button" aria-label="Try the process again">{content.again}</button>
                <a href="https://www.mesplaques.fr/" className="confirmation-button button" aria-label="Visit Mesplaques website">{content.visit}</a>
                </div>
            </section>
        </>
    );

}

export default DownloadConfirmation;