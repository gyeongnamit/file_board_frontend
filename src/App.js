import logo from './logo.svg';
import './App.css';
import React, {  useState } from "react";


import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    file: null,
  });

  function postChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function fileChange(e) {
    setFormData({ ...formData, file: e.target.files[0] });
  }

  function postSubmit(e) {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("author", formData.author);
    if (formData.file) {
      postData.append("file", formData.file);
    }

    axios
      .post("/post/create", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Post created successfully");
        setFormData({ title: "", content: "", author: "", file: null });
        
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post");
      });
  }


  return (
    <div>
    {/* 게시물 작성 폼 */}

    <form  onSubmit={postSubmit}  >
    
    <div>
      <label>제목:</label>
      <input name="title"  required  value={formData.title}   onChange={postChange} />
    </div>
    <div>
      <label>내용:</label>
      <textarea name="content" required   value={formData.content}  onChange={postChange} />
    </div>
    <div>
      <label>작성자:</label>
      <input name="author" required  value={formData.author}  onChange={postChange} />
    </div>
    <div>
      <label>첨부 파일:</label>
      <input type="file"            onChange={fileChange}   />
    </div>
    <button>게시물 작성</button>
  </form>
  </div>
  );
}

export default App;

