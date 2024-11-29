import React, {useState, createContext} from 'react'

export const UContextProvider = createContext(null)

const UContext = ({children}) => {
    const [user, setUser] = useState(null)
    
    return (
        <UContextProvider.Provider value={{
            user, 
            setUser,
            }}>
            {children}
        </UContextProvider.Provider>
    )
}
export default UContext;