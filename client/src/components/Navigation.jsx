import { useContext } from 'react';
import UploadContext from '../context/UploadContext'; // Adjust the path as necessary
import useLanguageFile from '../hooks/useLanguageFile';

const Navigation = () => {

    const { dispatch } = useContext(UploadContext);

    const content = useLanguageFile('navigation');

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        dispatch({ type: 'SET_LANGUAGE', payload: selectedLanguage });
    };

    if (!content) {
        return null;
    }

    return (
        <nav className="navbar-container" aria-label="Main Navigation">
            <a href="https://www.mesplaques.fr/" aria-label="Go to Mes Plaques homepage">
                <img
                    src={`${process.env.PUBLIC_URL}/mesplaqueslogo.png`}
                    alt="Mes Plaques Logo"
                    className="logo"
                />
            </a>
            <select onChange={handleLanguageChange} aria-label="Select Language" className="language-dropdown">
                <option value="en">{content.en}</option>
                <option value="fr">{content.fr}</option>
            </select>
        </nav>
    );
};

export default Navigation;
