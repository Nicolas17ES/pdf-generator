import { useState, useContext } from "react";
import PreviewButton from './shared/PreviewButton'

const Preview = ({ message, image }) => {

    return (
        <>
            <PreviewButton/>
            <div className="image-container">
                <img className="image" src={image} alt="Preview" />
                <p className="image-text">{message}</p>
            </div>
        </>
    );
};

export default Preview;