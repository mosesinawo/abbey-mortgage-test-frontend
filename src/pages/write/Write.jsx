import { useState } from "react";
import "./write.css";
import axios from "axios"
import { useSelector } from "react-redux";
import { user } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { URL } from "../../App";

export default function Write() {

  const data = useSelector(user)
  const currentUser = data;
const [title, setTitle] = useState("")
const [desc, setDesc] = useState("")
const [file, setFile] = useState(null)

const history = useHistory()

const handleSubmit = async (e) =>{
e.preventDefault()
const newPost = {
  title,
  desc,
  username: currentUser.username,
}
if(file){
  const data =new FormData();
  const filename = Date.now() + file.name
  data.append("name", filename)
  data.append("file", file)
  console.log(data)
  newPost.photo = filename

  try {
    const res = await axios.post(`${URL}/upload`,
     data)
     console.log(res)
     toast.success("image uploaded")

  } catch (err) {
    console.log(err)
  }
}
try {
  const post = await axios.post(`${URL}/posts`,
newPost)
console.log(post)
toast.success("Blog uploaded")
history.push(`/post/${post.data._id}`)
// window.location.replace(`/post/${post.data._id}`)

} catch (error) {
  console.log(error)
  toast.error("something went wrong")

}

}

  return (
    <div className="write">
      {file && <img
        className="writeImg"
        src={window.URL.createObjectURL(file)|| ''}   
         alt=""
      />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
