import { useContext } from "react"
import { PresContextProvider } from "../context/PresContext"
const usePresContext = () => {
    return useContext(PresContextProvider)
}
export default usePresContext