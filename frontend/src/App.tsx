import { Routes, Route } from "react-router-dom";
import MagazineHome from "@/pages/MagazineHome";
import Article from "@/pages/Article";
import ArticleIndex from "@/pages/ArticleIndex";
import ToolsAdvanced from "@/pages/ToolsAdvanced";
import PitstopEnhanced from "@/pages/PitstopEnhanced";
import Membership from "@/pages/Membership";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MagazineHome />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/archive" element={<ArticleIndex />} />
      <Route path="/tools" element={<ToolsAdvanced />} />
      <Route path="/pitstop" element={<PitstopEnhanced />} />
      <Route path="/membership" element={<Membership />} />
    </Routes>
  );
}
