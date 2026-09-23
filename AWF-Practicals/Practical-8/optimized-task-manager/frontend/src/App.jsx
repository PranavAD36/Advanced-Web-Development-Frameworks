// OPTIMIZED VERSION — lazy imports with Suspense for code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { getMe } from './api/api';

// Lazy-loaded route components — each becomes a separate chunk on demand
const Home = lazy(() => import('./pages/Home'));
const Tasks = lazy(() => import('./pages/Tasks'));

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
      <Suspense fallback={
        <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
          加载中...
        </div>
      }>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={user ? <Tasks user={user} onLogout={handleLogout} /> : <><Login onLogin={setUser} /></>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
