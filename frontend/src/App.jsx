import { useContext, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import UContext from './context/UContext'
import { authLogin } from './api/auth'

function App() {
  const context = useContext(UContext)
  const {pathname} = useLocation()
  
  useEffect(() => {
    const auth = async () => {
      const userData = await authLogin(localStorage.getItem('accessToken'))
      if (userData) {
        context.setUser(userData)
      }else {
        context.setUser(null)
      }
    }
    auth()
  },[])
  return (
    <section className=' w-full flex-box flex-col'>
      <Navbar />
      {pathname == '/'  ?  <Home/>: <Outlet/>}
    </section>
  )
}

export default App
