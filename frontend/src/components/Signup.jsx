import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
function Signup(){
  const navigate = useNavigate()
  const [msg,setMsg] = useState("");
    const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
function signUp(){
if(formData.username && formData.password){
  createUserWithEmailAndPassword(auth,formData.username, formData.password).then( (res)=>{
    console.log(res);
    navigate("/login")
  }).catch(e=>{
console.log(e);
if(e.code === "auth/email-already-in-use"){
setMsg("This email is already registered. Please log in.");
}
else if(e.code === "auth/weak-password"){
setMsg("password is too short. Please use at least 6 characters.");
}
else{
setMsg("Failed to create an account. Please try again.");
}

  })
}
}
  // 2. Handle input changes dynamically based on the input's 'name' attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // 3. Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // TODO: Send formData.username and formData.password to your backend/API here
    console.log('Submitting:', formData);
  };
return(
<>
<div className="signup-container">
    <div className="top-right-nav">
    <span className="nav-text">Existing user?</span>
    <button className="signup-corner-btn" onClick={()=> navigate('/login')}>Login</button>
  </div>
    <div className="fields" style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Username Field */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Email"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
  {msg && <span className="warning-msg">{msg}</span>}
        {/* Submit Button */}
        <button onClick={signUp} className="signBtn"
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Signup
        </button>
        
      </form>
    </div>
</div>
    </>
)
}
export default Signup;