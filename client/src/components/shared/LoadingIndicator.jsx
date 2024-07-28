import useLanguageFile from '../../hooks/useLanguageFile';

const LoadingIndicator = () => {

    const content = useLanguageFile('loader');

    if (!content) {
        return null;
    }

    return (
     <div className="loader" role="status" aria-live="polite">{content.load}</div>
    )
};

export default LoadingIndicator;

