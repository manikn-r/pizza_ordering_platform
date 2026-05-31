import logo from "../assets/logo.svg"
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
function Navbar(){
        const navigate=useNavigate();
    function handleSignOut(){
        signOut(auth).then( (res)=>{
            console.log(res);
            navigate("/login")
        })
    }
return(
    <>
    <nav>
        <div className="logo">                <img src={logo} alt="" width="40" height="40"></img></div>
        <div className="content">
            <span>Menu</span>
            <span>Cart<i class="fa-solid fa-cart-shopping"></i>
            </span>
            <span onClick={handleSignOut}>Logout</span>
        </div>
    </nav>
    </>
)
}

export default Navbar;