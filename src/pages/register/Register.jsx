import { useEffect, useState } from "react"
import "./register.css"
import axios from "axios"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useHistory } from "react-router"
import {URL} from "../../App";

// import { toast } from "react-toastify"


export default function Register() {

  const history = useHistory()

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [email, setEmail] = useState('') 
  const [error, setError] = useState(false) 
  const [isFetching, setisFetching] = useState(true) 

  const handleSubmit = async (e) =>{

    setError(false)
    e.preventDefault()
      try {
          const res = await axios.post(`${URL}/auth/register`, {
            username,password,email
          })
          console.log(res.data)
          toast.success('Registration succesful', {
            position: toast.POSITION.TOP_RIGHT
        });
        history.push("/login")
        return res.data
        }catch (error) { 
        console.log(error)
        setError(true)
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_RIGHT
      });
      }
  }  

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
        onChange={e => setUsername(e.target.value)}
        className="registerInput" type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input
         onChange={e => setEmail(e.target.value)}
        className="registerInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input
         onChange={e => setPassword(e.target.value)}
        className="registerInput" type="password" placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
      </form>
        { error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
    )
}
