import { createContext, useReducer } from 'react'
import uploadReducer from './UploadReducer'



const UploadContext = createContext();

export const initialState = {
    isPDFReady: false,
}

export const UploadProvider = ({ children }) => {


    const [state, dispatch] = useReducer(uploadReducer, initialState)

    return <UploadContext.Provider value={{
        isPDFReady: state.isPDFReady,
        dispatch,
    }}>
        {children}
    </UploadContext.Provider>
}

export default UploadContext 