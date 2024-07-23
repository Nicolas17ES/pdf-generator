
export const uploadImage = async (dispatch, formData) => {
    try {
        const response = await fetch("/upload-image", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data) {
            dispatch({ type: 'SET_IMAGE', payload: data });
        }

    } catch (error) {

        console.error("Error generating PDF user:", error);

        return null

    }

};