import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const TextArea = ({ value, onChange, maxLength }) => {
    const [alert, setAlert] = useState({ isVisible: false, color: '', message: '' });
    const [text, setText] = useState('');

    const handleChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxLength) {
            onChange(text);
            setText(text);
        } else {
            toast.error(`Message cannot exceed ${maxLength} characters.`);
        }
    };

    useEffect(() => {
        let alertColor = '';
        let alertMessage = '';
        let isVisible = false;

        if (text.length >= maxLength - 6 && text.length < maxLength - 2) {
            alertColor = 'orange';
            alertMessage = `${maxLength - text.length} characters left`;
            isVisible = true;
        } else if (text.length >= maxLength - 2 && text.length < maxLength) {
            alertColor = 'red';
            alertMessage = `${maxLength - text.length} characters left`;
            isVisible = true;
        } else if (text.length === maxLength) {
            alertColor = 'red';
            alertMessage = 'No more characters allowed';
            isVisible = true;
        }
        setAlert({ isVisible, color: alertColor, message: alertMessage });
    }, [text, maxLength]);

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
                aria-describedby="character-count"
                aria-required="true"
                required
            />
            {alert.isVisible && <sub id="character-count" className="alert-message" style={{ color: alert.color }}>{alert.message}</sub>}
            <hr style={{marginBottom: '50px'}}/>
        </>
    );
};

export default TextArea;
