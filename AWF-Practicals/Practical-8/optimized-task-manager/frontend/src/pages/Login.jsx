import { useState } from 'react';
import { loginUser } from '../api/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message || '登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, textAlign: 'center' }}>任务管理系统 — 登录</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>邮箱</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>密码</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} />
          </div>
          {error && <p style={{ color: '#dc2626', fontSize: 13, margin: '0 0 8px' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>
            {loading ? '登录中...' : '登录'}
          </button>
          <p style={{ marginTop: 16, fontSize: 14, color: '#64748b', textAlign: 'center' }}>
            还没有账号？<a href="/register" style={{ color: '#2563eb' }}>去注册</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
