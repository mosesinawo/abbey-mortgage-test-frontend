import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"

const  Homepage = () => {
  const [posts , setPosts] = useState([])
 const {search}  = useLocation()


useEffect(() => {
  const fetchPosts = async () =>{
    try {
      const res = await axios.get("http://localhost:5000/api/posts" + search )
   setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
   
  } 
  fetchPosts()
}, [search])
  


  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Homepage
