import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';

// pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import Search from './pages/Search';

// SEO meta
import { HelmetProvider } from 'react-helmet-async';

function App() {
  // Router
  return (
    <HelmetProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/category/:categorySlug" element={<Blog />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </HelmetProvider>
  );
}

export default App;
