import React from 'react'
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UContext from "./context/UContext.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UContext>
      <RouterProvider router={router}/>
    </UContext>
  </React.StrictMode>,
)