import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route , Routes, useLocation, useSearchParams } from "react-router-dom";
import BlogPage from "./Pages/BlogPage";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";





export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams , setSearchParams] = useSearchParams();

  const loaction = useLocation();

  // to filldtadta
  useEffect(() => {


    const page = searchParams.get("page") ?? 1;

    if( loaction.pathname.includes("tags")){
      // mhnje tag wala dkhvaycha ahe..
      const tag = loaction.pathname.split("/").at(-1).replaceAll("_" , " ");
      fetchBlogPosts(Number(page) , tag);
    }
    else if(window.location.pathname.includes("categories")){
      const category = window.location.pathname.split("/").at(-1).replaceAll("_" , " ");
      fetchBlogPosts(Number(page) , null, category);
    }

    else{
      fetchBlogPosts(Number(page));
    }

    


  }, [ window.location.pathname , window.location.search]);

  return (
    <Routes>
      <Route path="/" element={  <Home/> } ></Route>
      <Route path="/blog/:blogId" element={  <BlogPage/> } ></Route>
      <Route path="/tags/:tag" element={  <TagPage/> } ></Route>
      <Route path="/categories/:category" element={  <CategoryPage/> } ></Route>
    </Routes>
  );
}
