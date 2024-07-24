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
                >
                    Get started
                </button>
            }
            {(isFormVisible && !isPDFReady) && <ImageMessageForm/>}
        </div>

    );

}

export default Home;