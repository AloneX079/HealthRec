import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UContext from "./context/UContext.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DoctorDash from "./pages/DoctorDash.jsx";
import RecContext from "./context/RecContext.jsx";
import PresContext from "./context/PresContext.jsx";
import PharmacistDash from "./pages/PharmacistDash.jsx";

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
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/ddashboard",
        element: <DoctorDash />,
      },
      {
        path: "/pdashboard",
        element: <PharmacistDash />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UContext>
      <RecContext>
        <PresContext>
          <RouterProvider router={router} />
        </PresContext>
      </RecContext>
    </UContext>
  </React.StrictMode>
);
