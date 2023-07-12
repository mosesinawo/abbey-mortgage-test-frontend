import { Link } from "react-router-dom";
import "./singlePost.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { user } from "../../redux/authSlice";
import { URL } from "../../App";
export default function SinglePost() {
  const location = useLocation()
 const path = location.pathname.split("/")[2]
 const [post, setPost] = useState([])
 const [title, setTitle] = useState("")
const [desc, setDesc] = useState("")
const [updateMode, setUpdateMode] = useState(false)
 const data = useSelector(user)
  const currentUser = data;
 const PF = "http://localhost:5000/images/";
console.log(path)



  useEffect(() => {
    const getPost = async () =>{
      try {
        const res = await axios.get(`${URL}/posts/${path}`)
        setPost(res.data)
     setTitle(res.data.title)
     setDesc(res.data.desc)

      } catch (error) {
        console.log(error)
      }      
    }
    getPost()
  }, [path])
  
  const handleDelete = async () =>{
try {
  await axios.delete(`${URL}/posts/${path}`,
  {data:{username: currentUser.username}})
  window.location.replace(`/`)
} catch (error) {
  console.log(error)
}  
}

const handleUpdate = async() =>{
  try {
    await axios.put(`${URL}/posts/${path}`,
    {username: currentUser.username, title, desc})
    setUpdateMode(false)
   // window.location.reload()
  } catch (error) {
    console.log(error)
  }  
}



  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      {post?.photo && (
        <img
          className="postImg"
          src={PF +post.photo }
          alt=""
        />

      )}
      {updateMode ? <input type="text" autoFocus={true} 
       onChange={(e) => setTitle(e.target.value)}
      value={title} className="singlePostTitleInput"/> :(
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === currentUser?.username && (
          <div className="singlePostEdit">
            <i onClick={() => setUpdateMode(true)} className="singlePostIcon far fa-edit"></i>
            <i onClick={handleDelete} className="singlePostIcon far fa-trash-alt"></i>
          </div>
          )}
        </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
               {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ?
         <textarea autoFocus={true} className="singlePostDescInput"
         value={desc}
         onChange={(e) => setDesc(e.target.value)}
         />
         : (
        <p className="singlePostDesc">
         {post.desc}
        </p>
        )}
{  updateMode &&  <button onClick={handleUpdate} className="singlePostButton">Update</button>
}      </div>
    </div>
  );
}
