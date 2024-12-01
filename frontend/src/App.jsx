import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authLogin } from "./api/auth";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import useUserContext from "./hooks/useUserContext.js";

function App() {
    const { user, setUser, loading, setLoading } = useUserContext();
    const { pathname } = useLocation();

    // console.log(user);
    useEffect(() => {
        const auth = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }
            const userData = await authLogin(token);
            if (userData.success) {
                setUser(userData.data);
            } else {
                setUser(null);
                localStorage.removeItem("accessToken");
            }
            setLoading(false);
        };
        auth();
    }, [setUser]);
    return (
        <section className=" w-full flex-box flex-col">
            <Navbar />
            {pathname == "/" ? <Home /> : <Outlet />}
        </section>
    );
}

export default App;
