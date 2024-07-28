import { useState, useEffect, useContext } from 'react';
import UploadContext from '../context/UploadContext';

const useLanguageFile = (content) => {
    const { language } = useContext(UploadContext);
    const [loadedContent, setLoadedContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const languageFile = await import(`../languages/${language}/general.json`);
                setLoadedContent(languageFile.default[content][0]);
            } catch (error) {
                console.error(`Error loading language file: ${error}`);
            }
        };

        fetchData();
    }, [language, content]);

    return loadedContent;
};

export default useLanguageFile;