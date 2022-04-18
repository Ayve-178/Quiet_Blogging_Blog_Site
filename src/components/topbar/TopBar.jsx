import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
//import image from '../../assets/images/IMG_20200602_000759.jpg';
import "./TopBar.css";

export default function TopBar() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-facebook-square"></i>
        <i className="topIcon fa-brands fa-twitter-square"></i>
        <i className="topIcon fa-brands fa-pinterest-square"></i>
        <i className="topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/blogs/:userId" className="link">
              BLOGS
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              WRITE
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {currentUser ? (
          <ul className="topList">
            <li className="topListItem">
              {/* <img className='topImage' src={image} alt='profile'/> */}
              <span className="topUserIcon">
                <FaUser />
              </span>
              {(currentUser.uid === "Uc6ZDSNUrDOdbv2igXzea63HRng2") ? (
                <Link to="/admin">
                  <span className="topName">&nbsp;{currentUser.displayName.toUpperCase()}</span>
                </Link>
              ) : (
                <span className="topName">&nbsp;{currentUser.displayName.toUpperCase()}</span>
              )}
            </li>
            <li className="topListItem" onClick={logout}>
            &nbsp;&nbsp;{currentUser && "LOGOUT"}
            </li>
          </ul>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fa-solid fa-magnifying-glass"></i> */}
      </div>
    </div>
  );
}
