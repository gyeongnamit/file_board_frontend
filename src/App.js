import logo from './logo.svg';
import './App.css';
import React, {  useState } from "react";

import {  useEffect } from "react";


import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    file: null,
  });

  const [postList, setPostList] = useState([]); // 게시물 리스트 상태

  // 게시물 리스트를 가져오는 함수
  useEffect(() => {
    axios
      .get("/post/list")
      .then((response) => {
        setPostList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);


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

        // 게시물 리스트 갱신
        axios
          .get("/post/list")
          .then((response) => {
            setPostList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });

        
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
  {/* 게시물 리스트 출력 */}
  <h2>게시물 리스트</h2>
      <ul>
        {postList.map((post) => (
          <li key={post.post_id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>작성자:</strong> {post.author}</p>
            <p><strong>작성일:</strong> {new Date(new Date(post.created_at).getTime() + 9 * 60 * 60 * 1000).toLocaleString()}</p>
            {post.attachment_url && (
              <p>
                <strong>첨부 파일:</strong>{" "}
                <a href={post.attachment_url} target="_blank" rel="noopener noreferrer">
                  다운로드
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>

  </div>
  );
}

export default App;

