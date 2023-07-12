import { useState } from "react";
import "./login.css";
import {login, user, status, error} from '../../redux/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom"
import {  toast } from "react-toastify";

export default function Login() {

 const data = useSelector(user)
 const err = useSelector(error)
 const isFetching = useSelector(status)
 console.log(isFetching)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const history  = useHistory()
  
  
  const dispatch = useDispatch()

  const handleSubmit = async (e) =>{
    e.preventDefault()
      try {
        dispatch(login({username, password}))
        }catch (error) { 
        console.log(error)
      }
  } 

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
         onChange={e => setUsername(e.target.value)}
        className="loginInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input
         onChange={e => setPassword(e.target.value)}
        className="loginInput" type="password" placeholder="Enter your password..." />
        <button disabled={isFetching} className="loginButton">Login</button>
      </form>
        { err && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}

    </div>
  );
}
