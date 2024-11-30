import { useContext } from "react"
import { RecContextProvider } from "../context/RecContext"

const useRecContext = () =>{
    return useContext(RecContextProvider)
}

export default useRecContext