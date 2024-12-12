import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    {/* 게시물 작성 폼 */}
    <form>
    <div>
      <label>제목:</label>
      <input name="title"  required />
    </div>
    <div>
      <label>내용:</label>
      <textarea name="content" required  />
    </div>
    <div>
      <label>작성자:</label>
      <input name="author" required  />
    </div>
    <div>
      <label>첨부 파일:</label>
      <input type="file" />
    </div>
    <button type="submit">게시물 작성</button>
  </form>
  </div>
  );
}

export default App;
