import { Link } from "react-router-dom"

const Navbar = ()=>{
    return(
        <div style={{display:'flex', justifyContent:"space-evenly"}}>
            <h1><Link to={"/login"}>Login</Link></h1>
            <h1><Link to={"/signup"}>Signup</Link></h1>
            
        </div>
    )
}

export default Navbar