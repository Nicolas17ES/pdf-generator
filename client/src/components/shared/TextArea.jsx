import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useLanguageFile from '../../hooks/useLanguageFile';

const TextArea = ({ value, onChange, maxLength }) => {
    const content = useLanguageFile('textarea');
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
            alertMessage = `${maxLength - text.length} ${content.characters}`;
            isVisible = true;
        } else if (text.length >= maxLength - 2 && text.length < maxLength) {
            alertColor = 'red';
            alertMessage = `${maxLength - text.length} ${content.characters}`;
            isVisible = true;
        } else if (text.length === maxLength) {
            alertColor = 'red';
            alertMessage = content.allowed;
            isVisible = true;
        }
        setAlert({ isVisible, color: alertColor, message: alertMessage });
    }, [text, maxLength]);

    if (!content) {
        return null;
    }

    return (
        <>
            <label htmlFor="textarea" className="upload-label">
                {content.label}
            </label>
            <textarea
                className="textarea"
                value={value}
                onChange={handleChange}
                placeholder={content.placeholder}
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
