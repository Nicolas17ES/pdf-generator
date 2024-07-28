import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import ImageMessageForm from '../components/ImageMessageForm'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import useLanguageFile from '../hooks/useLanguageFile';
import { Helmet } from 'react-helmet';


function Home() {

    const { dispatch, isPDFReady } = useContext(UploadContext);

    const content = useLanguageFile('home');

    const [isFormVisible, setIsFormVisible] = useState(false);

    const navigate = useNavigate(); 

    useEffect(() => {
        if (isPDFReady) {
            navigate('/confirmation');
            dispatch({ type: 'SET_SHOW_PREVIEW', payload: false });
            toast.success(content.toast);
        }
    }, [isPDFReady])

    if (!content) {
        return null;
    }

    return (

        <>
            <Helmet>
                <meta name="description" content="Generate your custom PDF by uploading a message and an image. Easily create personalized PDF files for various purposes with our PDF Generator."  />
                <title>Home Page</title>
            </Helmet>

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
        </>

    );

}

export default Home;