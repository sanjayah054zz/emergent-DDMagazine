import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Article from "@/pages/Article";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:slug" element={<Article />} />
    </Routes>
  );
}
