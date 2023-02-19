import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../AuthContext/AuthContexProvider"

const Navbar2 = ()=>{
    const {isAuth,logout} = useContext(AuthContext) 
    console.log(isAuth)
    // useEffect(()=>{

    // },[logout])
    return(
        <div style={{display:'flex', justifyContent:"space-evenly"}}>
            <h1><Link to={"/notes"}>Notes</Link></h1>
            <h1 onClick={logout}>Logout</h1>
            
        </div>
    )
}

export default Navbar2