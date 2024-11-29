import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

function Navbar() {
    const {user, setUser} = useUserContext()
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
                        <span className="text-xl font-bold text-gray-800">
                        HealthRec
                        </span>
                    </Link>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact Us
                                </NavLink>
                                
                            </li>
                            <li>
                                <NavLink
                                    className={() =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Feedback
                                </NavLink>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="flex items-center lg:order-2">
                    {user ? <h1 className="text-2xl font-semibold">{user.name}</h1>:(
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