import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {


  const PF = "http://localhost:5000/images/"
  return (
    <div className="post" 
    data-aos="zoom-in-up"
    data-aos-offset="200" 
    data-aos-easing="ease-in-sine" data-aos-duration="400">
      {post.photo && (

        <img
          className="postImg"
          src={PF + post.photo}
          alt="post"
        />


      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {
            return <span className="postCat" key={c}>
              <Link className="link" to="/posts?cat=Music">
                {c}
              </Link>
            </span>
          })}

        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
