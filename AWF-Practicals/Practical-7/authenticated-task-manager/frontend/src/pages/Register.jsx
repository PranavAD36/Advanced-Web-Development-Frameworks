import { useState } from 'react';
import { registerUser } from '../api/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    try {
      await registerUser({ name, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.message || '注册失败，请检查输入');
    }
  }

  if (success) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={titleStyle}>注册成功</h2>
          <p style={{ color: '#64748b', marginBottom: 20 }}>账号已创建，请前往登录。</p>
          <a href="/login" style={linkStyle}>去登录</a>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>任务管理系统 — 注册</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label>姓名</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label>邮箱</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label>密码（至少6位）</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label>确认密码</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} style={inputStyle} />
          </div>
          {error && <p style={errorStyle}>{error}</p>}
          <button type="submit" style={btnStyle}>注册</button>
          <p style={{ marginTop: 16, fontSize: 14, color: '#64748b' }}>
            已有账号？<a href="/login" style={{ color: '#2563eb' }}>去登录</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' };
const cardStyle = { background: '#fff', borderRadius: 12, padding: '32px', width: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' };
const titleStyle = { margin: '0 0 24px', fontSize: 20, textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: 14 };
const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 4 };
const inputStyle = { padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 };
const errorStyle = { color: '#dc2626', fontSize: 13, margin: '0 0 8px' };
const btnStyle = { padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' };
const linkStyle = { display: 'block', textAlign: 'center', color: '#2563eb', textDecoration: 'none' };

export default Register;
