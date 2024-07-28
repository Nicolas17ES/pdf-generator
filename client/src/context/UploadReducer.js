
/**
 * @file context/uploadReducer.js
 * @description Reducer function for managing upload state.
 */

/**
 * Reducer function for handling actions and updating global state.
 * @param {Object} state - The current upload state.
 * @param {Object} action - An action object with a type and payload.
 * @returns {Object} - The new global state.
 */
import { initialState } from "./UploadContext"

const uploadReducer = (state, action) => {
    switch (action.type) {
        case 'SET_IS_PDF_READY':
            return {
                ...state,
                isPDFReady: action.payload,
            }
        case 'SET_SHOW_PREVIEW':
            return {
                ...state,
                showPreview: action.payload,
            }
        case 'SET_SELECTED_IMAGE':
            return {
                ...state,
                selectedImage: action.payload,
            }
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload,
            }

        case 'RESET_STATE':
            return {
                ...initialState,
                language: state.language, // Preserve the current language state
            };

        default:
            return state;
    }
}

export default uploadReducer