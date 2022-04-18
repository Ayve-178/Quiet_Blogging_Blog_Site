import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import fireDB from "../../firebase-config";
import "./Write.css";

export default function Write() {
  const [formData, setFormData] = useState({
    imageURL: "",
    title: "",
    category: "",
    description: "",
  });
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const onFileChange = async (e) => {
    const { name } = e.target;
    const storage = getStorage();
    const file = e.target.files[0];
    const fileRef = ref(storage, file.name);

    uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    getDownloadURL(ref(storage, file.name))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "image";
        xhr.onload = (event) => {
          const image = xhr.response;
          console.log(image);
        };
        xhr.open("GET", url);
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: url,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postInfo = {
      imageURL: formData.imageURL,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      userId: currentUser.uid,
      author: currentUser.displayName,
      time: new Date().toLocaleString(),
    };

    var categoryList = JSON.parse(localStorage.getItem("categories"));
    const catItem = postInfo.category.toLowerCase();

    const found = categoryList.find(element => element===catItem);
    
    if(!found) {
      categoryList.push(catItem);
      localStorage.setItem("categories", JSON.stringify(categoryList));
    }

    try {
      await addDoc(collection(fireDB, "blog-posts"), postInfo);
      toast.success("Post Added Successfully!");
      navigate(`/blogs/${currentUser.uid}`)
    } catch (error) {
      toast.error("Failed!");
    }
  };

  return (
    <div className="write">
      <img className="writeImage" src={formData.imageURL} alt="" />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            name="imageURL"
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="writeInput"
            onChange={handleChange}
            autoFocus={true}
            value={formData.title}
          />
        </div>
        <div className="writeFormGroup">
          <input
            name="category"
            type="text"
            placeholder="Category"
            className="writeCategory"
            onChange={handleChange}
            value={formData.category}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            name="description"
            placeholder="Description"
            type="text"
            className="writeInput writeText"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <button className="writeSubmit" onClick={handleSubmit}>
          Publish
        </button>
      </form>
    </div>
  );
}
