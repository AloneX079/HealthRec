import { createContext, useState } from "react";

export const RecContextProvider = createContext()

const RecContext = ({ children }) => {
    const [record, setRecord] = useState(null)

    return (
        <RecContextProvider.Provider
            value={{
                record,
                setRecord,

            }}
        >
            {children}
        </RecContextProvider.Provider>
    );
};

export default RecContext