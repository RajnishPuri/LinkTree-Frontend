import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
