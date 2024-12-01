import { useContext } from "react"
import { RecContextProvider } from "../context/RecContext.jsx"

const useRecContext = () =>{
    return useContext(RecContextProvider)
}

export default useRecContext