import { Link } from "react-router-dom";
import "./topbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, user } from "../../redux/authSlice";
import { useState } from "react";

export default function Topbar() {

  const PF = "https://mblog-app-api.onrender.com/images/";

  const data = useSelector(user)
  const currentUser = data;
  const [showNav, setShowNav] = useState(false)

  const dispatch = useDispatch()

  const handleShow = () => {
    setShowNav(!showNav)
  }
  const handleHide = () => {
    setShowNav(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleHide()
  }
  return (
    <header className= "top ">
        <i onClick={handleShow} class="hamburger topIcon fa fa-bars"></i>
      <div className={showNav ? "show-shadow" : "hide-shadow"}>
        <nav className={showNav ? "top-nav  navActive" : "top-nav"}>
          <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>

          </div>
          <div className="topCenter">
            <ul className="topList">
              <li className="topListItem">
                <Link onClick={handleHide} className="link" to="/">
                  HOME
                </Link>
              </li>
              <li onClick={handleHide} className="topListItem">ABOUT</li>
              <li onClick={handleHide} className="topListItem">CONTACT</li>
              <li onClick={handleHide} className="topListItem">
                <Link onClick={handleHide} className="link" to="/write">
                  WRITE
                </Link>
              </li>
              {currentUser && <li onClick={handleLogout} className="topListItem">
                <Link className="link" to="/login">
                  LOGOUT
                </Link>
              </li>}
            </ul>
          </div>
          <div className="topRight">
            {currentUser ? (
              <Link onClick={handleHide} className="link" to="/settings">
                <img
                  className="topImg"
                  src={PF + currentUser.profilePic}
                  alt="profile"
                />
              </Link>
            ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link onClick={handleHide} className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link onClick={handleHide} className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            )}
            <i className="topSearchIcon fas fa-search"></i>
          </div>
        </nav>
      </div>
    </header>
  );
}


