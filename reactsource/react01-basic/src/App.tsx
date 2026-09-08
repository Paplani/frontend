import './App.css'

function App() {
  return (
    <>
      <h2>React-기본</h2>

      <ol>
        <li>
          프론트엔드
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>React</li>
          </ul>
        </li>
        <li>
          백엔드
          <ul>
            <li>JAVA</li>
            <li>PYTHON</li>
            <li>ORACLE</li>
            <li>Node.js</li>
          </ul>
        </li>
      </ol>

      <form action="">
        <select name="gubun">
          <option value="front">프론트엔드</option>
          <option value="back">백엔드</option>
        </select>
        <input type="text" name="title" />
        <input type="submit" value="추가" />
      </form>
    </>
  )
}

export default App
