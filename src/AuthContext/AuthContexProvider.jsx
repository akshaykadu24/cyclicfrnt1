import {  createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider =({children})=>{
    
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
            setIsAuth(true)
        }
    },[])
    
    
    const loggedIn = ()=>{
        let token = localStorage.getItem("token")
        if(token){
            setIsAuth(true)
        }
        
    }
    const logout = ()=>{
        let token = localStorage.setItem("token","")
        if(token){
            setIsAuth(false)
        }
    }
    

    const value = {isAuth,loggedIn,logout}
    return(
        <AuthContext.Provider value = {value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider