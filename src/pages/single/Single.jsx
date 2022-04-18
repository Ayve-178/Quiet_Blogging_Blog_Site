/* eslint-disable react-hooks/exhaustive-deps */
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../contexts/AuthContext';
import fireDB from '../../firebase-config';
import "./Single.css";


export default function Single() {
  const [post, setPost] = useState();

  const params = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const postID = params.postId;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const myPost = await getDoc(doc(fireDB, "blog-posts", postID));
      setPost(myPost.data());
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async() => {
    try {
        await deleteDoc(doc(fireDB, "blog-posts", postID));
        toast.success("Post Deleted!");
        navigate(`/blogs/${currentUser.uid}`);
    } catch (error) {
        toast.error("Something is wrong!");
    }
  }


  const updatePost = () => {
    navigate(`/update/${postID}`);
  }

  return (
    <div className="single">
      {post && (
        <div className="singlePost">
          <div className="singlePostWrapper">
            <img src={post.imageURL} alt="" className="singlePostImage" />
            <h1 className="singlePostTitle">
              {post.title}
              {(currentUser && currentUser.uid === post.userId) && (
                <div className="singlePostEdit">
                  <i onClick={updatePost} class="singlePostIcon fa-regular fa-pen-to-square"></i>
                  <i onClick={deletePost} class="singlePostIcon fa-regular fa-trash-can"></i>
                </div>
              )}
            </h1>
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author: <b>{post.author}</b>
              </span>
              <span className="singlePostDate">{post.time}</span>
            </div>
            <p className="singlePostDescription">
              {post.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
