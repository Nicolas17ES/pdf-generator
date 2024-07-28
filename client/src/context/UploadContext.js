import { createContext, useReducer } from 'react'
import uploadReducer from './UploadReducer'



const UploadContext = createContext();

export const initialState = {
    isPDFReady: false,
    showPreview: false,
    selectedImage: null,
    language: 'en',
}

export const UploadProvider = ({ children }) => {


    const [state, dispatch] = useReducer(uploadReducer, initialState)

    return <UploadContext.Provider value={{
        isPDFReady: state.isPDFReady,
        showPreview: state.showPreview,
        selectedImage: state.selectedImage,
        language: state.language,
        dispatch,
    }}>
        {children}
    </UploadContext.Provider>
}

export default UploadContext 