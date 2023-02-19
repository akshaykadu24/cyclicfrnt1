import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../AuthContext/AuthContexProvider"

const Notes = ()=>{
    const {isAuth} = useContext(AuthContext)

    const [data,setData] = useState([])
    const [val,setVal] = useState({})
    const [noteData,setNoteData] = useState({})
    const [updateData,setUpdateData] = useState({})
    const [css,setCss] = useState(false)

   
    console.log(isAuth)
    useEffect(()=>{
        fetch("https://pink-concerned-eagle.cyclic.app/note",{
            headers:{
            "Content-type":"application/json",
            "Authorization":JSON.parse(localStorage.getItem("token"))
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            setData(res)
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    },[noteData])

   
    console.log(data)

    const handleChange = (e)=>{
        const {name,value} = e.target
        setVal({...val,[name]:value})
    }
    console.log(val)
    const handleSubmit =()=>{
        setNoteData(val)
        fetch("https://pink-concerned-eagle.cyclic.app/note/create",{
            method:"POST",
            body:JSON.stringify(noteData),
            headers:{
                "Content-type":"application/json",
                "Authorization":JSON.parse(localStorage.getItem("token"))
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    const onUpdate=(el)=>{
        setUpdateData(el)
        let tit = document.getElementById("tit")
        tit.value = el.title
        let inf = document.getElementById("inf")
        inf.value = el.info
        let aut = document.getElementById("aut")
        aut.value = el.author
        setCss(true)
    }

    const handleUpdate = (id)=>{
        setUpdateData(val)
        console.log(val,'llll')
        fetch(`https://pink-concerned-eagle.cyclic.app/note/update/${id}`,{
            method:"PATCH",
            body:JSON.stringify(val),
            headers:{
                "Content-type":"application/json",
                "Authorization":JSON.parse(localStorage.getItem("token"))
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            window.location.reload()
        }).catch(err=>{
            console.log(err)
        })
        setCss(false)
    }
    
    const handleDelete =(id)=>{
        // setNoteData(noteData)    // added because of delete update in use effect
        fetch(`https://pink-concerned-eagle.cyclic.app/note/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":JSON.parse(localStorage.getItem("token"))
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            window.location.reload()
        }).catch(err=>{
            console.log(err)
        })
    }



    return(
        <div>
            <div>
                <h2>Create Note</h2>
                <input type="text" name="title" onChange={(e)=>{handleChange(e)}} id="" placeholder="Enter Your Note Title"/>
                <input type="text" name="info" onChange={(e)=>{handleChange(e)}} id="" placeholder="Enter Your Note Info"/>
                <input type="text" name="author" onChange={(e)=>{handleChange(e)}} id="" placeholder="Enter writer Name"/>

                <button onClick={handleSubmit}>Create</button>
            </div>
            <div id="update" style={css? {display:"block", backgroundColor:"skyblue",position:"fixed",padding:"10px",marginLeft:"40%" }:{display:"none"}} >
                <h2>Update Note</h2>
                <input type="text" name="title" onChange={(e)=>{handleChange(e)}} id="tit" placeholder="Enter Your Note Title"/> <br />
                <input type="text" name="info" onChange={(e)=>{handleChange(e)}} id="inf" placeholder="Enter Your Note Info"/> <br />
                <input type="text" name="author" onChange={(e)=>{handleChange(e)}} id="aut" placeholder="Enter writer Name"/> <br />

                <button onClick={()=>handleUpdate(updateData._id)}>Update</button>
            </div>
            <h1>Notes</h1>
            <div>
                {
                    data?.map((el)=>{
                        return(
                            <div key={el._id}>
                                <hr />
                                <h2>Title: {el.title}</h2>
                                <p>Info: {el.info}</p>
                                <p>Author: {el.author}</p>
                                <button onClick={()=>onUpdate(el)}>Update</button>
                                <button style={{color:"red"}} onClick={()=>{handleDelete(el._id)}}>Delete</button>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default Notes