import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authLogin } from "./api/auth";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import useUserContext from "./hooks/useUserContext.js";

function App() {
    const { user, setUser } = useUserContext();
    const { pathname } = useLocation();
    // console.log(user);
    useEffect(() => {
        const auth = async () => {
            const userData = await authLogin(
                localStorage.getItem("accessToken")
            );
            if (userData.success) {
                setUser(userData);
            } else {
                setUser(null);
            }
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
