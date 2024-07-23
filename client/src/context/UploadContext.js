import { createContext, useReducer } from 'react'
import uploadReducer from './UploadReducer'



const UploadContext = createContext();

export const initialState = {
    image: {},
}

export const UploadProvider = ({ children }) => {


    const [state, dispatch] = useReducer(uploadReducer, initialState)

    return <UploadContext.Provider value={{
        image: state.formData,
        dispatch,
    }}>
        {children}
    </UploadContext.Provider>
}

export default UploadContext 