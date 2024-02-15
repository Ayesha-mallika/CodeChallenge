import logo from './logo.svg';
import './App.css';
import Menu from './Components/Menu';
import {toast, ToastContainer} from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserMenu from './Components/UserMenu';
import Register from './Components/Register';
import Login from './Components/Login';
import AddEvent from './Components/AddEvent';
import Events from './Components/Events';
import UpdateEvent from './Components/UpdateEvent';
import AdminEvents from './Components/AdminEvents';
import "react-toastify/dist/ReactToastify.css";

function App() {
  var usertype = localStorage.getItem('role');
  return (
    <div className="App">
        <BrowserRouter>
      {usertype==="Admin"?<Menu/> : <UserMenu/> }
      <ToastContainer/>
      <div class="margin">
          <Routes>
            <Route path="UserMenu" element={<UserMenu/>}/>
            <Route path="Menu" element={<Menu/>}/>
            <Route path="Register" element={<Register/>}/>
            <Route path="Login" element={<Login/>}/>
            <Route path="AddEvent" element={<AddEvent/>}/>
            <Route path="UpdateEvent" element={<UpdateEvent/>}/>
            <Route path="Home" element={<Events/>}/>
            <Route path="AdminEvents" element={<AdminEvents/>}/>
          </Routes>
          </div>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
