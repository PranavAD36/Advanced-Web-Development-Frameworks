import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import { useState, useEffect } from 'react';
import { getMe } from './api/api';

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe().then((u) => setUser(u)).catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }).finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  }

  if (checking) {
    return <div style={{ padding: 40, textAlign: 'center' }}>加载中...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={user ? <Tasks user={user} onLogout={handleLogout} /> : <><Login onLogin={setUser} /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
