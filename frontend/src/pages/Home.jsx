import React, { useContext } from "react"
import Footer from "../components/Footer.jsx"
import { useNavigate } from "react-router-dom"
import useUserContext from "../hooks/useUserContext.js"

function Home() {
  const context = useUserContext()
  const navigate = useNavigate()
  return (
    <section className="w-full flex-box flex-col">
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-center">
            Welcome to the Home Page
            </h1>
            {/* <button className="btn" onClick={() => navigate("/login")}>
            Login
            </button> */}
        </div>
        <Footer />
    </section>
  )
}

export default Home
