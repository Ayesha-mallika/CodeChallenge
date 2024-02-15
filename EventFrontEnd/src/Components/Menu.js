import { Link, useNavigate} from "react-router-dom";

function Menu(){
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/Home');
        window.location.reload();

    }

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/AdminEvents">Events</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/AdminEvents">Home</Link>
        </li>
        <li class="nav-item dropdown"> 
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> Events</a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <Link class="dropdown-item" to="/AddEvent">Add Event</Link>
                            <Link class="dropdown-item" to="/AdminEvents">Edit Events</Link>
                        </div>
                    </li>
                    <li class="nav-item dropdown"> 
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> {localStorage.getItem("name")? localStorage.getItem("name") : "Login/Register" }</a>
                        <div class="dropdown-menu dropdown-menu-right">
                            {localStorage.getItem("token")?
                            <div>
                                <Link class="dropdown-item" onClick={logout}>logout</Link>

                            </div> 
                            :
                            <div><Link class="dropdown-item" to="/Login">Login</Link>
                            <Link class="dropdown-item" to="/Register">Register</Link></div>
                            }
                        </div>
                    </li>
      </ul>
    </div>
  </div>
</nav>
    )

}
export default Menu;