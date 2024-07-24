export const uploadImage = async (dispatch, formData) => {
    try {
        const response = await fetch("/pdf/generate", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the response as a Blob (binary data)
        const blob = await response.blob();

        // Create a URL for the Blob and trigger a download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'generated.pdf'; // Filename for the downloaded PDF
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(link.href);

    } catch (error) {
        console.error("Error generating PDF user:", error);
    }
};
