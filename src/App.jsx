import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CoursesPage from './pages/CoursesPage';
import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestRoute from './components/Auth/GuestRoute';

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
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <RegisterPage />
                            </GuestRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
};

export default App;
