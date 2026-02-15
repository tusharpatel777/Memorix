import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MemoryProvider } from './context/MemoryContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateMemoryPage from './pages/CreateMemoryPage';
import MemoryDetailPage from './pages/MemoryDetailPage';
import ProfilePage from './pages/ProfilePage';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div className="text-white flex justify-center items-center h-screen">Loading...</div>;

    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <MemoryProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                            <Route index element={<Dashboard />} />
                            <Route path="create" element={<CreateMemoryPage />} />
                            <Route path="memory/:id" element={<MemoryDetailPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </Routes>
                    <ToastContainer theme="dark" position="bottom-right" />
                </MemoryProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
