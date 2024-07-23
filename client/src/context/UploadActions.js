
export const uploadImage = async (dispatch, userData) => {

    try {
        const response = await fetch("/upload-image", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set Content-Type header
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data) {
            dispatch({ type: 'SET_IMAGE', payload: data });
        }

        return data

    } catch (error) {

        console.error("Error registering user:", error);

        return null

    }

};