import logo from "../assets/logo.svg"
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
function Navbar(){
        const navigate=useNavigate();
        console.log("from header");
        console.log(auth);
        
        
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
        {/* <div className="userName">welcome {auth.currentUser.email+" " || " "} !</div> */}
        {auth.currentUser && <div className="welcome-wrapper">
  Welcome, <span className="user-email">{auth.currentUser.email || ""}</span>! 🍕
</div>}
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