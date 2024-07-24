export const uploadImage = async (dispatch, formData) => {
    try {
        const response = await fetch("/pdf/generate", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data) {
            dispatch({ type: 'SET_IMAGE', payload: data });
        }

    } catch (error) {
        console.error("Error generating PDF user:", error);
    }
};
