// import { useState } from 'react'
// import './App.css'



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import DiaryList from "./pages/DiaryList";
import DiaryDetail from "./pages/DiaryDetail";
import NewDiary from "./pages/NewDiary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<DiaryList />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />
        <Route path="/new" element={<NewDiary />} />
      </Routes>

      <Link to="/">Home</Link>
      <Link to="/diary">DiaryList</Link>
      <Link to="/diary/:id">DiaryDetail</Link>
      <Link to="/new">NewDiary</Link>
    </BrowserRouter>
  );
}




export default App;
