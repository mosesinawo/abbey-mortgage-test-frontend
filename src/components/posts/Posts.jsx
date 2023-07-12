import Post from "../post/Post";
import "./posts.css";
 import AOS from "aos";
import "aos/dist/aos.css";



export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => {

        return <Post post={p} key={p._id} />
      })}
    </div>
  );
}
