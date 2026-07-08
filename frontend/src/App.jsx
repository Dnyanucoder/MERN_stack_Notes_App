import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import api from './api';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Notes from './pages/Notes.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setCheckingAuth(false));
  }, []);

  async function handleLogout() {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // ignore network errors on logout
    }
    setUser(null);
    navigate('/login');
  }

  if (checkingAuth) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <div className="page">
      <nav className="navbar">
        <h1>Notes App</h1>
        <div className="nav-links">
          {user ? (
            <>
              <span>Hi, {user.username}</span>
              <button className="link" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route
            path="/register"
            element={user ? <Navigate to="/notes" /> : <Register onAuth={setUser} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/notes" /> : <Login onAuth={setUser} />}
          />
          <Route
            path="/notes"
            element={user ? <Notes /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={user ? '/notes' : '/login'} />} />
        </Routes>
      </div>
    </div>
  );
}
