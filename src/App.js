import logo from './logo.svg';
import './App.css';
import React, {  useState } from "react";
function App() {
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    file: null,
  });

  return (
    <div>
    {/* 게시물 작성 폼 */}
    <form>
    <div>
      <label>제목:</label>
      <input name="title"  required  value={formData.title}  />
    </div>
    <div>
      <label>내용:</label>
      <textarea name="content" required   value={formData.content}/>
    </div>
    <div>
      <label>작성자:</label>
      <input name="author" required  value={formData.author} />
    </div>
    <div>
      <label>첨부 파일:</label>
      <input type="file" />
    </div>
    <button>게시물 작성</button>
  </form>
  </div>
  );
}

export default App;
