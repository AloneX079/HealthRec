import { createContext, useState } from "react";

export const UContextProvider = createContext();

const UContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    return (
        <UContextProvider.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading
            }}
        >
            {children}
        </UContextProvider.Provider>
    );
};
export default UContext;
