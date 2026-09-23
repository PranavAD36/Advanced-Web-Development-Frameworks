import { Link } from 'react-router-dom';

function Home() {
  return (
    <main style={{ padding: 40, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <h1>任务管理系统</h1>
      <p style={{ color: '#64748b', marginTop: 16 }}>基于 React + Node.js + MongoDB 的全栈任务管理平台</p>
      <div style={{ marginTop: 32 }}>
        <Link to="/tasks" style={{ display: 'inline-block', padding: '12px 24px', background: '#2563eb', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
          进入任务管理
        </Link>
      </div>
    </main>
  );
}

export default Home;
