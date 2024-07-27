import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import ImageMessageForm from '../components/ImageMessageForm'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


function Home() {

    const { isPDFReady } = useContext(UploadContext);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const navigate = useNavigate(); 

    useEffect(() => {
        if (isPDFReady) {
            toast.success('PDF has been downloaded.');
            navigate('/confirmation');  
        }
    }, [isPDFReady])


    return (

        <div className="page-container">
            <header className="home-header">
                <h1 className="title">PDF Generator</h1>
                <h2 className="subtitle">
                    Upload a message and an image to generate your PDF file.
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
                    Get started
                </button>
            }
            {(isFormVisible && !isPDFReady) && <ImageMessageForm/>}
        </div>

    );

}

export default Home;