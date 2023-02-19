import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { AuthContext } from "../AuthContext/AuthContexProvider"

const Login = ()=>{
    const {isAuth,loggedIn,logout} = useContext(AuthContext)
    const [val,setVal] = useState({})
    const [login,setLogin] = useState({})

    if(isAuth) return <Navigate to="/notes"/>
    
    let handleChange = (e)=>{
        let {name,value} = e.target
        setVal({...val,[name]:value})
    }

    let handleLogin = ()=>{
        setLogin(val)
        fetch("https://pink-concerned-eagle.cyclic.app/user/login",{
            method:"POST",
            body:JSON.stringify(val),
            headers:{
                "Content-type":"application/json",
            
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            localStorage.setItem("token",JSON.stringify(res.token))
            loggedIn()
            
        }).catch(err=>{
            console.log(err)

        })
        
    }
    console.log(val,login)
    return(
        <div>
            <h1>LOGIN</h1>
            <div>
                <input type="text" onChange={(e)=>{handleChange(e)}} name="email" id="" placeholder="Enter your Email" />
                <input type="password" onChange={(e)=>{handleChange(e)}} name="pass" id="" placeholder="Enter your Password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login