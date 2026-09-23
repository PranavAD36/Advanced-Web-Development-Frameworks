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
    if (password !== confirmPassword) { setError('两次输入的密码不一致'); return; }
    try {
      await registerUser({ name, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.message || '注册失败，请检查输入');
    }
  }

  if (success) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 16px' }}>注册成功</h2>
          <p style={{ color: '#64748b', marginBottom: 20 }}>账号已创建，请前往登录。</p>
          <a href="/login" style={{ color: '#2563eb' }}>去登录</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, textAlign: 'center' }}>任务管理系统 — 注册</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div><label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>姓名</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} /></div>
          <div><label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>邮箱</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} /></div>
          <div><label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>密码（至少6位）</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} /></div>
          <div><label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>确认密码</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14 }} /></div>
          {error && <p style={{ color: '#dc2626', fontSize: 13, margin: '0 0 8px' }}>{error}</p>}
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>注册</button>
          <p style={{ marginTop: 16, fontSize: 14, color: '#64748b', textAlign: 'center' }}>已有账号？<a href="/login" style={{ color: '#2563eb' }}>去登录</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
