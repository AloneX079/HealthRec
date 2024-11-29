import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { authLogin } from "./api/auth";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { UContextProvider } from "./context/UContext.jsx";

function App() {
    const { user, setUser } = useContext(UContextProvider);
    const { pathname } = useLocation();
    console.log(user);

    useEffect(() => {
        const auth = async () => {
            const userData = await authLogin(
                localStorage.getItem("accessToken")
            );
            if (userData) {
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
            <h1 className="text-xl">{user.name}</h1>
            {user ? "Hie" : "byee "}
            {pathname == "/" ? <Home /> : <Outlet />}
        </section>
    );
}

export default App;
