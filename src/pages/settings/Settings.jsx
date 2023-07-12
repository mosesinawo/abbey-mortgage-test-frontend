import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout, user } from "../../redux/authSlice";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { URL } from "../../App";

export default function Settings() {

  const currentUser = useSelector(user)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()

  const history = useHistory()

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedUser = {
      userId: currentUser._id,
      username,
      email,
      password
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      updatedUser.profilePic = filename
      console.log(updatedUser)

      try {
        const res = await axios.post(`${URL}/upload`,
          data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const user = await axios.put(`${URL}/users/` + currentUser._id,
        updatedUser)
      setSuccess(true)
      dispatch(getUser(user.data))
      // window.location.replace(`/post/${post.data._id}`)
    } catch (error) {
      console.log(error)
    }
    // try {
    //   const res = await axios.patch(`${URL}/posts/${currentUser._id}`,
    //     { username: username })
    //   console.log(res)
    // } catch (error) {
    //   console.log(error)
    // }

  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${URL}/users/` + currentUser._id, {
        data: {
          userId: currentUser._id,
          username: currentUser.username
        }
      })
      console.log(res)
      toast.success(`${res.data}`, {
        position: toast.POSITION.TOP_RIGHT
      })
      if (res.status === 200) {
        history.push("/")
      }
      dispatch(logout())
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    console.log(currentUser)
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span onClick={handleDelete} className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + currentUser.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={currentUser.username} name="name"
            onChange={e => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input type="email" placeholder={currentUser.email} name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input type="password" placeholder="password" name="password"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{ color: "green", margin: "20px " }}>Profile updated..</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

//https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
