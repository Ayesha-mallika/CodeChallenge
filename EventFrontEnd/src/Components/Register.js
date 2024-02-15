import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';
import { toast } from "react-toastify";

function Register(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [repassword,setrePassword] = useState("");
    const [role,setRole] = useState("User");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");  
    const [phone,setPhone] = useState("");
    const navigate = useNavigate();

    const admin=()=>{
      setRole("Admin");
  }
  const user=()=>{
      setRole("User");
  }
    
    const signUp = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:5086/api/User/register",{
            email: username,
            role:	role,
            password:password,
            phone : phone,
            Username : name,
            reTypePassword : repassword
        })
        .then (async (userData)=>{
            toast.success("Registeration Successfull...");
            var token = await userData.data.token;
            await localStorage.setItem("token",token);
            await localStorage.setItem("role",userData.data.role);
            await localStorage.setItem("id",userData.data.email);
            await localStorage.setItem("name",userData.data.Username);
            console.log(userData.data);
            setTimeout(function(){
              window.location.reload();
            },5000);
            navigate("/Home");
        })
        .catch((err)=>{
            toast.error("Could not register");
            console.log(username)
            console.log(phone)
            console.log(name)
            console.log(role)
            console.log(err.response.data);
        })
    }
        return (
          <div class="addbook">
            <form onSubmit={signUp}>
              <div class="form">
                  <div class="title">Welcome</div>
                  <div class="subtitle">Let's create your account!</div>
                  <div class="input-container ic1">
                    <input id="name" class="input" required type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                  </div>
                  <div class="input-container ic2">
                    <input id="email" class="input" required type="email" placeholder="Email" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                  </div>
                  <div class="input-container ic2">
                    <input id="phone" class="input" required type="phone" placeholder="Phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                  </div>
                  <div class="input-container ic2">
                    <input id="address" class="input" required type="text" placeholder="City" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                  </div>
                  <div class="input-container ic2">
                    <input id="password" class="input" required type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <div class="input-container ic2">
                    <input id="repassword" class="input" required type="password" placeholder="Re-Password" value={repassword} onChange={(e)=>{setrePassword(e.target.value)}}/>
                  </div>
                  <button type="submit" class="submit">{role==='User' ? "Register as User": "Register as Event Manager"}</button>
                  <div class="text-center fs-6">
                    {role==='User' ? <Link to="/Register" class="choice" onClick ={admin}>Register as Event Manager</Link> : <Link class="choice" to="/Register" onClick ={user}>Register as User</Link>}
                 
                </div>
                <div class="text-center choice fs-6">
                or <Link to="/Login" class="choice">Login</Link>
                </div>
              </div>
            </form>
            
                
          </div>
          );

}

export default Register;