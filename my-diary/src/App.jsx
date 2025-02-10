import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import DiaryList from "./pages/DiaryList";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<DiaryList />} />
      </Routes>

      {/* <Link to="/">Home</Link> */}
      {/* <Link to="/diary">DiaryList</Link> */}
    </BrowserRouter>
  );
}

export default App;