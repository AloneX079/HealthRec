import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import UContext from './context/UContext.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
        {
            path: "/",
            element: <Navbar />,
        },
        {
            path: "/login",
            element: (
                    <Login />
            ),
        },
        {
            path:"/register",
            element: (
                    <Login />
            ),
        },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UContext>
      <RouterProvider router={router}/>
    </UContext>
  </React.StrictMode>,
)