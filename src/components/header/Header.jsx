import { useEffect } from "react";
import "./header.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div  className="header">
      <div  className="headerTitles" data-aos="fade-up"
      data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600"
      data-aos-anchor-placement="center" >
        <h4 className="headerTitleSm">React & Node</h4>
        <h2 className="headerTitleLg">BLOG</h2>
      </div>
      {/* <img
        className="headerImg"
        src="https://images.pexels.com/photos/64769/pexels-photo-64769.jpeg"
        alt=""
      /> */}
    </div>
  );
}
