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

        <textarea
            value={value}
            onChange={handleChange}
            placeholder="Enter your text"
            name="message"
            maxLength={maxLength}
            required
        />
        
    );
};

export default TextArea;