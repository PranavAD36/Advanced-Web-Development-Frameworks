import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getMe } from '../api/api';

function Tasks({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPriority, setFormPriority] = useState('medium');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [me, setMe] = useState(user);

  async function fetchTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || '加载失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const task = await createTask({ title: formTitle, description: formDesc, priority: formPriority });
      setTasks((prev) => [task, ...prev]);
      setFormTitle('');
      setFormDesc('');
      setFormPriority('medium');
      setShowForm(false);
    } catch (err) {
      alert(err.message || '创建失败');
    }
  }

  async function handleUpdate(task) {
    try {
      const updated = await updateTask(task._id, { title: editTitle, description: editDesc, completed: task.completed, priority: editPriority });
      setTasks((prev) => prev.map((t) => t._id === task._id ? updated : t));
      setEditId(null);
    } catch (err) {
      alert(err.message || '更新失败');
    }
  }

  async function handleToggleComplete(task) {
    try {
      const updated = await updateTask(task._id, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => t._id === task._id ? updated : t));
    } catch (err) {
      alert(err.message || '更新失败');
    }
  }

  async function handleDelete(taskId) {
    if (!confirm('确认删除此任务？')) return;
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      alert(err.message || '删除失败');
    }
  }

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={h1Style}>任务管理</h1>
        <span style={userStyle}>你好，{me?.name || user?.name}</span>
        <button onClick={onLogout} style={logoutBtnStyle}>退出登录</button>
      </header>

      <div style={contentStyle}>
        <button onClick={() => setShowForm(true)} style={addBtnStyle}>+ 新建任务</button>

        {showForm && (
          <form onSubmit={handleCreate} style={formBoxStyle}>
            <h3>新建任务</h3>
            <input placeholder="任务标题（必填）" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required style={inputStyle} />
            <input placeholder="描述（选填）" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} style={inputStyle} />
            <select value={formPriority} onChange={(e) => setFormPriority(e.target.value)} style={inputStyle}>
              <option value="low">低优先级</option>
              <option value="medium">中优先级</option>
              <option value="high">高优先级</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={submitBtnStyle}>保存</button>
              <button type="button" onClick={() => setShowForm(false)} style={cancelBtnStyle}>取消</button>
            </div>
          </form>
        )}

        {loading && <p style={tipStyle}>加载中...</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p style={tipStyle}>暂无任务，点击「新建任务」开始。</p>
        )}

        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {tasks.map((task) => (
            <li key={task._id} style={taskStyle}>
              {editId === task._id ? (
                <div style={{ flex: 1 }}>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={inputStyle} placeholder="标题" />
                  <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} style={inputStyle} placeholder="描述" />
                  <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} style={inputStyle}>
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={() => handleUpdate(task)} style={submitBtnStyle}>保存</button>
                    <button onClick={() => setEditId(null)} style={cancelBtnStyle}>取消</button>
                  </div>
                </div>
              ) : (
                <>
                  <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task)} style={{ marginRight: 10 }} />
                  <span style={{ ...taskNameStyle, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#1e293b' }}>
                    {task.title}
                  </span>
                  <span style={{
                    ...badgeStyle,
                    background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#dbeafe',
                    color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#2563eb',
                  }}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                  <button onClick={() => { setEditId(task._id); setEditTitle(task.title); setEditDesc(task.description || ''); setEditPriority(task.priority || 'medium'); }} style={iconBtnStyle}>编辑</button>
                  <button onClick={() => handleDelete(task._id)} style={{ ...iconBtnStyle, color: '#dc2626' }}>删除</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', background: '#f8fafc' };
const headerStyle = { display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', background: '#1e293b', color: '#fff' };
const h1Style = { margin: 0, fontSize: 18 };
const userStyle = { marginLeft: 'auto', fontSize: 14, color: '#cbd5e1' };
const logoutBtnStyle = { padding: '6px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 };
const contentStyle = { maxWidth: 720, margin: '24px auto', padding: '0 16px' };
const addBtnStyle = { padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 };
const formBoxStyle = { background: '#fff', borderRadius: 8, padding: 16, marginTop: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };
const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 };
const submitBtnStyle = { padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' };
const cancelBtnStyle = { padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 6, cursor: 'pointer' };
const tipStyle = { color: '#94a3b8', marginTop: 16 };
const taskStyle = { display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 8, padding: '12px 16px', marginBottom: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' };
const taskNameStyle = { flex: 1, fontSize: 15 };
const badgeStyle = { padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600 };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: 13, padding: '4px 8px' };

export default Tasks;
