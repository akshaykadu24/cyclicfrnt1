import { useState } from "react"

const Signup = ()=>{
    const [val,setVal] = useState({})
    const [formData,setFormData] = useState({})
    let handleChange = (e)=>{
        let {name,value} = e.target
        setVal({...val,[name]:value})
        
    }
    console.log(val)
    let handleSubmit = ()=>{
        setFormData(val)
        fetch("https://pink-concerned-eagle.cyclic.app/user/register",{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    console.log(formData)

    return(
        <div>
            <h1>SIGNUP</h1>
            <div>
                <input type="text" onChange = {(e)=>{handleChange(e)}} name="name" id="" placeholder="Enter your Name" />
                <input type="text" onChange = {(e)=>{handleChange(e)}} name="email" id="" placeholder="Enter your Email" />
                <input type="text" onChange = {(e)=>{handleChange(e)}} name="pass" id="" placeholder="Enter your Password" />
                <input type="text" onChange = {(e)=>{handleChange(e)}} name="age" id="" placeholder="Enter your age" />
                <button  onClick={handleSubmit}>Signup</button>

            </div>
        </div>
    )
}

export default Signup