import { useContext } from "react";
import { UContextProvider } from "../context/UContext";

const useUserContext = () => {
    return useContext(UContextProvider);
}

export default useUserContext;