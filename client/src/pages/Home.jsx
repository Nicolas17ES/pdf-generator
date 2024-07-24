import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import ImageMessageForm from '../components/ImageMessageForm'
import { useEffect } from "react";
import { toast } from 'react-toastify';

function Home() {

    const { isPDFReady } = useContext(UploadContext);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (isPDFReady) {
            toast.success('PDF has been downloaded.');
        }
    }, [isPDFReady])


    return (

        <div className="home-container">
            <header className="home-header">
                <h1 className="home-title">PDF Generator</h1>
                <p className="home-description">
                    Upload a message and an image to generate a PDF file. Preview the content before downloading.
                </p>
            </header>
            {!isFormVisible && 
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="main-button"
                    aria-expanded={isFormVisible}
                >
                    Get started
                </button>
            }
            {isFormVisible && <ImageMessageForm/>}
        </div>

    );

}

export default Home;