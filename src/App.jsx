import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CoursesPage from './pages/CoursesPage';
import JobsPage from './pages/JobsPage';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
