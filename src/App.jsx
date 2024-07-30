import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DirectoryPage } from "./pages/DirectoryPage/DirectoryPage";
import { DiagramPage } from "./pages/DiagramPage/DiagramPage";
import "./App.scss";
import { Nav } from "./layouts/Nav/Nav";

export function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<DirectoryPage />} />
          <Route path="/statistics" element={<DiagramPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}
