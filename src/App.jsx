import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestRoute from './components/Auth/GuestRoute';

const App = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
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
