import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from './pages/home';
import AdminCRM from './pages/crm';

function App() {
    const { isLoading, isAuthenticated, setUser, setLoading, user } = useAuthStore();

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    },
                    cache: 'no-store'
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.data.user);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [setUser, setLoading]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        {
                            isAuthenticated && user?.role === 'user' ? (
                                <Home />
                            ) : (
                                <AdminCRM />
                            )
                        }
                    </ProtectedRoute>
                } />
                
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
