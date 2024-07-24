
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

        case 'RESET_STATE':
            return {
                ...initialState,
            };

        default:
            return state;
    }
}

export default uploadReducer