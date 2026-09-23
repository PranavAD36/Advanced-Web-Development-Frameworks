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
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>任务管理系统 — 登录</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label>邮箱</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label>密码</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
          </div>
          {error && <p style={errorStyle}>{error}</p>}
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? '登录中...' : '登录'}
          </button>
          <p style={{ marginTop: 16, fontSize: 14, color: '#64748b' }}>
            还没有账号？<a href="/register" style={{ color: '#2563eb' }}>去注册</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' };
const cardStyle = { background: '#fff', borderRadius: 12, padding: '32px', width: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' };
const titleStyle = { margin: '0 0 24px', fontSize: 20, textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: 16 };
const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 4 };
const inputStyle = { padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 };
const errorStyle = { color: '#dc2626', fontSize: 13, margin: '0 0 8px' };
const btnStyle = { padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' };

export default Login;
