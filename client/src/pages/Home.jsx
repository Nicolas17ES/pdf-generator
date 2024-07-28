import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import ImageMessageForm from '../components/ImageMessageForm'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import useLanguageFile from '../hooks/useLanguageFile';

function Home() {

    const { isPDFReady } = useContext(UploadContext);

    const content = useLanguageFile('home');

    const [isFormVisible, setIsFormVisible] = useState(false);

    const navigate = useNavigate(); 

    useEffect(() => {
        if (isPDFReady) {
            toast.success(content.toast);
            navigate('/confirmation');  
        }
    }, [isPDFReady])

    if (!content) {
        return null;
    }

    return (

        <div className="page-container">
            <header className="home-header">
            <h1 className="title">{content.title}</h1>
                <h2 className="subtitle">
                    {content.subtitle}
                </h2>
            </header>
            {!isFormVisible && 
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="main-button button"
                    aria-expanded={isFormVisible}
                    aria-controls="image-message-form"
                    aria-label="Start the process of generating a PDF"
                >
                    {content.start}
                </button>
            }
            {(isFormVisible && !isPDFReady) && <ImageMessageForm/>}
        </div>

    );

}

export default Home;