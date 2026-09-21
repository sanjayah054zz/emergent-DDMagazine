import { Routes, Route } from "react-router-dom";
import MagazineHome from "@/pages/MagazineHome";
import Article from "@/pages/Article";
import ArticleIndex from "@/pages/ArticleIndex";
import ToolsAdvanced from "@/pages/ToolsAdvanced";
import PitstopEnhanced from "@/pages/PitstopEnhanced";
import MembershipEnhanced from "@/pages/MembershipEnhanced";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Account from "@/pages/Account";
import Help from "@/pages/Help";
import Contact from "@/pages/Contact";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MagazineHome />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/archive" element={<ArticleIndex />} />
      <Route path="/tools" element={<ToolsAdvanced />} />
      <Route path="/pitstop" element={<PitstopEnhanced />} />
      <Route path="/membership" element={<MembershipEnhanced />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Account />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
