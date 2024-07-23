import { useState, useContext } from "react";

const Preview = ({ message, image }) => {

    return (
        <div className="image-container">
            <img className="image" src={image} alt="Preview" />
            <p className="image-text">{message}</p>
        </div>
    );
};

export default Preview;