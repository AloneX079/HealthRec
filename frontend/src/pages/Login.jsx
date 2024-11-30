import React from 'react'
import { useContext,useEffect, useState } from 'react'
import {Form, Link, useLocation, useNavigate} from 'react-router-dom'
import { login, register } from "../api/auth"
import ErrorText from '../components/ErrorText.jsx'
import useUserContext from "../hooks/useUserContext.js"

const Login = () => {
    const {pathname} = useLocation()
    const {user,setUser} = useUserContext()
    const navigate = useNavigate()
    const initialError = {
        status:false,
        message:""
    }
    const initialLogInCredentials = {
        name: "",
        phone: "",
        email: "",
        password: "",
    }
    
    const [error, setError] = useState(initialError)
    const [logInCredentials, setLogInCredentials] = useState(initialLogInCredentials)

    useEffect(() => {
        setError(initialError)
        setLogInCredentials(initialLogInCredentials)
    },[pathname]) 

    const handleLogin = async(e) => {
        e.preventDefault();
        const loginResponse = await login(logInCredentials);
        if(loginResponse.status==false){
            return  setError({status:true, message:loginResponse.message})
        }
        localStorage.setItem("accessToken", loginResponse.userData["accessToken"])
        // console.log(loginResponse.userData["loggedInUser"])
        setUser(loginResponse.userData["loggedInUser"]);
        
        return navigate("/",{replace:true})
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        const registerResponse = await register(logInCredentials);

        if(registerResponse.success==false){
            return  setError({status:true, message:registerResponse.message.data})
        }
        setUser(userData["data"]);

        return navigate("/",{replace:true})
    }
  return (
    <section className="w-full flex flex-col justify-start items-center">
    <div className="w-full flex-box flex-col h-full justify-center items-center">
        <div className="col-span-1 w-full h-screen flex flex-col p-5 gap-5 bg-green-100 shadow-inner drop-shadow-lg text-center">
            <Form className="border-green-200 flex-box flex-col">
                <h1 className="text-[4rem] font-bold bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-green-600 to-green-950 bg-clip-text text-transparent">
                    {pathname === "/register" ? "SignUp" : "Login"}
                </h1>
                <h1 className="text-lg text-black">
                    Please enter your credentials to access your Health Records.
                </h1>

                {pathname === "/register" ? (
                    <>
                        <div className="items-center justify-center w-full flex-col mt-8">
                            <h1 className="text-xl font-semibold">Name</h1>
                            <input
                                value={logInCredentials.name}
                                onChange={(e) => {
                                    setError(initialError);
                                    setLogInCredentials({
                                        ...logInCredentials,
                                        name: e.target.value,
                                    });
                                }}
                                type="text"
                                className="w-1/4 px-3 py-2 focus:outline-none border-green-300 rounded-lg"
                            />
                        </div>
                        <div className="items-center justify-center w-full flex-col">
                            <h1 className="text-xl font-semibold">Phone</h1>
                            <input
                                value={logInCredentials.phone}
                                onChange={(e) => {
                                    setError(initialError);
                                    setLogInCredentials({
                                        ...logInCredentials,
                                        phone: e.target.value,
                                    });
                                }}
                                type="text"
                                className="w-1/4 px-3 py-2 focus:outline-none border-green-300 rounded-lg"
                            />
                        </div>
                    </>
                ) : null}

                <div className="items-center justify-center w-full flex-col mt-8">
                    <h1 className="text-xl font-semibold">Email</h1>
                    <input
                        value={logInCredentials.email}
                        onChange={(e) => {
                            setError(initialError);
                            setLogInCredentials({
                                ...logInCredentials,
                                email: e.target.value,
                            });
                        }}
                        type="email"
                        className="w-1/4 px-3 py-2 focus:outline-none border-green-300 rounded-lg"
                    />
                </div>

                <div className="items-center justify-center w-full flex-col">
                    <h1 className="text-xl font-semibold">Password</h1>
                    <input
                        value={logInCredentials.password}
                        onChange={(e) => {
                            setError(initialError);
                            setLogInCredentials({
                                ...logInCredentials,
                                password: e.target.value,
                            });
                        }}
                        type="password"
                        className="w-1/4 px-3 py-2 focus:outline-none border-green-300 rounded-lg"
                    />
                </div>

                {error.status === true ? <ErrorText text={error.message} /> : null}

                <div className="w-full flex-box flex-col gap-3">
                    {pathname === "/register" ? (
                        <>
                            <button
                                className="w-1/3 px-6 py-3 text-lg font-semibold mt-5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={handleRegister}
                            >
                                SignUp
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="w-1/3 px-6 py-3 text-lg font-semibold mt-5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </Form>
        </div>
    </div>
</section>

  )
}

export default Login