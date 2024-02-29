import Post from "../post/Post";
import "./posts.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Oval } from 'react-loader-spinner'



export default function Posts({ posts }) {
  return (
    <div className="posts">
      {
        posts.length <= 0 ?

        <div style={{width:'100%', height:'100%'}}>

          <Oval
            height={150}
            width="100%"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />

        </div>
           :


          posts.map((p) => {

            return <Post post={p} key={p._id} />
          })


      }
    </div>
  );
}
