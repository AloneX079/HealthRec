import { createContext, useState } from "react";

export const UContextProvider = createContext();

const UContext = ({ children }) => {
    const [user, setUser] = useState(false);

    return (
        <UContextProvider.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UContextProvider.Provider>
    );
};
export default UContext;
