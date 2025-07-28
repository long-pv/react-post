import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';

// redux store
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOptions } from "./store/options/optionsSlice";
import { getLatestPosts } from "./store/posts/postsSlice";

function App() {
  
  // luôn gọi 1 lần duy nhất mỗi lần load app
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInitialData = () => {
      dispatch(getOptions());
      dispatch(getLatestPosts());
    };
    fetchInitialData();
  }, [dispatch]);

  // Router
  return (
    <Router>
      <Header />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
