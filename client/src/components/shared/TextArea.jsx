import { useState, useContext } from "react";
import UploadContext from "../../context/UploadContext";
import { toast } from 'react-toastify';

const TextArea = ({ value, onChange, maxLength}) => {

    const handleChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxLength) {
            onChange(text);
        } else {
            toast.error(`Message cannot exceed ${maxLength} characters.`);
        }
    };
   

    return (

        <>

            <label htmlFor="textarea" className="upload-label">
                1) Add your text
            </label>

            <textarea
                className="textarea"
                value={value}
                onChange={handleChange}
                placeholder="Text goes here..."
                name="message"
                maxLength={maxLength}
                required
            />
        </>
        
    );
};

export default TextArea;