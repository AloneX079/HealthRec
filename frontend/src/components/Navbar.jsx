import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function Navbar() {
    const {user, setUser} = useUserContext()
    const Navigate = useNavigate()
    const handleSignOut = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        return Navigate("/");
    }
  return (
    <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/hospital-icon.svg"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                        <span className="text-xl font-bold text-gray-800 lg:hover:bg-transparent hover:text-green-700">
                        HealthRec
                        </span>
                    </Link>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {user? (
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                                
                            </li>
                            ):(
                            <li>
                                <NavLink
                                    to="/"
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                                
                            </li>
                            )}
                            <li>
                                <NavLink
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Feedback
                                </NavLink>
                            </li>
                            {user?.isDoctor ?
                                <li>
                                <NavLink
                                    to="/ddashboard"
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-700 lg:p-0`
                                    }
                                >
                                    Doctor Panel
                                </NavLink>
                                </li>
                            : null}
                            {
                                user?.isAdmin ?
                                <li>
                                <NavLink
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Admin Panel
                                </NavLink>
                                </li>
                            :null}
                        </ul>
                    </div>
                    <div className="flex items-center lg:order-2">
                    {user ?(
                        <div className="w-full col-span-1 flex justify-end items-center">
                        <div className="relative group">
                            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-green-600 transition duration-200">
                                {user?.name || "UserName Undefined"}
                            </h1>
                            <div className="absolute flex flex-col items-start gap-2 p-4 bg-green-100 shadow-lg border border-green-300 rounded-lg top-12 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
                                <Link
                                    to="/profile"
                                    className="w-full text-left text-green-800 font-medium hover:bg-green-500 hover:text-white px-4 py-2 rounded-md duration-150 flex items-center gap-2"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left text-red-600 font-medium hover:bg-red-500 hover:text-white px-4 py-2 rounded-md transition duration-150 flex items-center gap-2"
                                >
                                    SignOut
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    ):(
                    <>
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="text-white bg-green-400 hover:bg-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Sign Up
                        </Link>
                    </>
                    )}   
                    </div>
                    
                </div>
            </nav>
        </header>
  )
}

export default Navbar