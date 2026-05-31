import { StrictMode, useContext, useEffect } from 'react'
import { context } from "./context/Cartcontext";
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import Signup from './components/Signup'
import Login from './components/Login'
import Cart from './components/Cart'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import CartProvider from './context/Cartcontext'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import axios from 'axios';
import UserDetails from './components/UserDetailsPage';
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hidePages = ['/login', '/signup'].includes(location.pathname);
  const {isAdmin, setAdmin} = useContext(context)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const isUserAdmin = currentUser.uid === "9GX9jZ1wS2SRU03X0cfQFui7bDZ2";
      setAdmin(isUserAdmin)
      if (currentUser && isUserAdmin) {
        navigate("/userDetails")
      }
      else if (currentUser && location.pathname !== "/signup") {
        navigate('/menu')
      }
      // axios.get("http://localhost:4050/getUsers").then((data) => {

      // })
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="container">
        {/* <BrowserRouter> */}
        {!hidePages && <Navbar />}
        <Routes>
          <Route path="" element={<Login />}></Route>
          {!isAdmin && <Route path="/menu" element={<Menu />}></Route>}
          {!isAdmin && <Route path="/cart" element={<Cart />}></Route>}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          {isAdmin && <Route path="/userDetails" element={<UserDetails />}></Route>}
        </Routes>
        {!hidePages && <Footer />}
        {/* </BrowserRouter> */}
      </div></>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </>
)
