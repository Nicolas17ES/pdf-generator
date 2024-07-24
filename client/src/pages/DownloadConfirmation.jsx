import UploadContext from "../context/UploadContext";
import { toast } from 'react-toastify';
import { useState, useContext } from "react";

function DownloadConfirmation() {

    const { dispatch, showPreview } = useContext(UploadContext);


    return (

        <section className="page-container">
            <h2 className="confirmation-title">Your PDF has been downloaded</h2>
            <p className="confirmation-paragraph">Thank you for using Mesplaques, would you like to try again?</p>
            <div className="confirmation-buttons-container">
                <button className="confirmation-button">Try again</button>
                <button className="confirmation-button">Visit Mesplaques</button>
            </div>
        </section>

    );

}

export default DownloadConfirmation;;