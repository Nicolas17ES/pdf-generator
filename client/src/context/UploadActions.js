import { toast } from 'react-toastify';

export const uploadImage = async (dispatch, formData) => {
    
    const fileNameWithExtension = formData.get('name') || 'generated';
    const fileName = fileNameWithExtension.replace(/\.(jpg|jpeg|png)$/i, '');

    try {
        const response = await fetch("/pdf/generate", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            // Check if the response has a JSON body
            const errorResponse = await response.json();
            const errorMessage = errorResponse.error || 'An unknown error occurred';
            toast.error(`Error: ${errorMessage}`);
            throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`);
        }

        // Get the response as a Blob (binary data)
        const blob = await response.blob();

        // Create a URL for the Blob and trigger a download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.pdf`; // Filename for the downloaded PDF
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(link.href);

        dispatch({ type: 'SET_IS_PDF_READY', payload: true });

        // Redirect to /confirmation
        window.location.href = '/confirmation'; 

    } catch (error) {
        // Error handling
        const errorMessage = error.response?.data?.error || 'An unknown error occurred';
        toast.error(`Error: ${errorMessage}`);
    }
};
