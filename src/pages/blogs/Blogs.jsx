import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../contexts/AuthContext';
import fireDB from "../../firebase-config";
import './Blogs.css';

function Blogs() {
    const [posts, setPosts] = useState([]);

    const {currentUser} = useAuth();
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

      const updatePost = (post) => {
        navigate(`/update/${post.id}`);
      }

      const deletePost = async(post) => {
        try {
            await deleteDoc(doc(fireDB, "blog-posts", post.id));
            toast.success("Post Deleted!");
            getData();
        } catch (error) {
            toast.error("Something is wrong!");
        }
      }

  return (
    <div className='blogs'>
        <table>
            <thead>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Time</th>
                <th>Action</th>
            </thead>
            <tbody>
                {posts.filter((obj)=> obj.userId === currentUser.uid).map(post => {
                    return (
                        <tr>
                            <td><img src={post.imageURL} alt="" height="60" width="60"/></td>
                            <td 
                                onClick={() => navigate(`/single/${post.id}`)}
                                className="blogsPostTitle"
                            >
                                {post.title}
                            </td>
                            <td>{post.category}</td>
                            <td>{post.time}</td>
                            <td>
                              <span 
                                className="blogsPostEdit"
                                onClick={() => updatePost(post)}
                              >
                                <FaEdit />
                              </span>
                              <span 
                                onClick={() => deletePost(post)} 
                                className="blogsPostDelete"
                              >
                                &nbsp;&nbsp;<FaTrash />
                              </span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Blogs