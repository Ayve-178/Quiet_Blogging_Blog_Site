import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import fireDB from "../../firebase-config";
import "./Home.css";
import "./Post.css";
import "./SideBar.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const myPosts = await getDocs(collection(fireDB, "blog-posts"));
      const postsArray = [];
      myPosts.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        postsArray.push(obj);
      });
      postsArray.sort(function compare(a,b) {
        var dateA = new Date(a.time);
        var dateB = new Date(b.time);
        return dateB - dateA; 
      });
      setPosts(postsArray);
    } catch (error) {
      console.log(error);
    }
  }

  var categoryList = JSON.parse(sessionStorage.getItem("categories"));

  return (
    <>
      <Header />
      <div className="home">
        <div className="posts">
          {posts
            .filter((obj) => obj.title.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((post) => {
              return (
                <div className="post">
                  <img className="postImage" src={post.imageURL} alt="" />
                  <div className="postInfo">
                    <div className="postCats">
                      <span className="postCat">{post.category}</span>
                    </div>
                    <span 
                      className="postTitle"  
                      onClick={() => navigate(`/single/${post.id}`)}
                    >
                      {post.title}
                    </span>
                    <hr />
                    <div className="postDescInfo">
                      <div>{post.author}</div>
                      <div>&nbsp;&nbsp;&nbsp;{post.time}</div>
                    </div>
                  </div>
                  <p className="postDescription">
                    {post.description}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="sidebar">
          <div className="sidebarItem">
            <div className="sidebarTitle">ABOUT US</div>
            <p>
              Quiet Blogging is a coding blog publishing platform where readers find the solution of their problems and experts shares their knowledge and ideas and a fresher can start learning. <br/> Stay with <b>Quiet Blogging</b>!
            </p>
          </div>

          <div className="sidebarItem">
            <div className="sidebarTitle">SEARCH</div>
            <input
              className="searchBar"
              type="text"
              placeholder="Search Here"
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </div>

          <div className="sidebarItem">
            <div className="sidebarTitle">CATEGORIES</div>
            <select
            className="sideBarCategory"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">-Select Category-</option>
            {categoryList.map((element) => {
              return (
                <option value={element}>{element}</option>
              )
            })}
          </select>
          </div>
        </div>
      </div>
    </>
  );
}
