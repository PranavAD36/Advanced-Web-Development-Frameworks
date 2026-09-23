import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';

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

  async function fetchTasks() {
    try { setLoading(true); setTasks(await getTasks()); }
    catch (err) { setError(err.message || '加载失败'); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try { const task = await createTask({ title: formTitle, description: formDesc, priority: formPriority }); setTasks((prev) => [task, ...prev]); setFormTitle(''); setFormDesc(''); setFormPriority('medium'); setShowForm(false); }
    catch (err) { alert(err.message || '创建失败'); }
  }

  async function handleUpdate(task) {
    try { const updated = await updateTask(task._id, { title: editTitle, description: editDesc, completed: task.completed, priority: editPriority }); setTasks((prev) => prev.map((t) => t._id === task._id ? updated : t)); setEditId(null); }
    catch (err) { alert(err.message || '更新失败'); }
  }

  async function handleToggle(task) {
    try { const updated = await updateTask(task._id, { ...task, completed: !task.completed }); setTasks((prev) => prev.map((t) => t._id === task._id ? updated : t)); }
    catch (err) { alert(err.message || '更新失败'); }
  }

  async function handleDelete(taskId) {
    if (!confirm('确认删除此任务？')) return;
    try { await deleteTask(taskId); setTasks((prev) => prev.filter((t) => t._id !== taskId)); }
    catch (err) { alert(err.message || '删除失败'); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', background: '#1e293b', color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>任务管理</h1>
        <span style={{ marginLeft: 'auto', fontSize: 14, color: '#cbd5e1' }}>你好，{user?.name}</span>
        <button onClick={onLogout} style={{ padding: '6px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>退出登录</button>
      </header>
      <div style={{ maxWidth: 720, margin: '24px auto', padding: '0 16px' }}>
        <button onClick={() => setShowForm(true)} style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>+ 新建任务</button>
        {showForm && (
          <form onSubmit={handleCreate} style={{ background: '#fff', borderRadius: 8, padding: 16, marginTop: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 12px' }}>新建任务</h3>
            <input placeholder="任务标题（必填）" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }} />
            <input placeholder="描述（选填）" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }} />
            <select value={formPriority} onChange={(e) => setFormPriority(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }}>
              <option value="low">低优先级</option><option value="medium">中优先级</option><option value="high">高优先级</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>保存</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 6, cursor: 'pointer' }}>取消</button>
            </div>
          </form>
        )}
        {loading && <p style={{ color: '#94a3b8', marginTop: 16 }}>加载中...</p>}
        {error && <p style={{ color: '#dc2626', marginTop: 16 }}>{error}</p>}
        {!loading && !error && tasks.length === 0 && <p style={{ color: '#94a3b8', marginTop: 16 }}>暂无任务，点击「新建任务」开始。</p>}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {tasks.map((task) => (
            <li key={task._id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 8, padding: '12px 16px', marginBottom: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {editId === task._id ? (
                <div style={{ flex: 1 }}>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }} placeholder="标题" />
                  <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }} placeholder="描述" />
                  <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, marginBottom: 8 }}>
                    <option value="low">低</option><option value="medium">中</option><option value="high">高</option>
                  </select>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={() => handleUpdate(task)} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>保存</button>
                    <button onClick={() => setEditId(null)} style={{ padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: 6, cursor: 'pointer' }}>取消</button>
                  </div>
                </div>
              ) : (
                <>
                  <input type="checkbox" checked={task.completed} onChange={() => handleToggle(task)} style={{ marginRight: 8 }} />
                  <span style={{ flex: 1, fontSize: 15, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#1e293b' }}>{task.title}</span>
                  <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600, background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#dbeafe', color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#2563eb' }}>
                    {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                  </span>
                  <button onClick={() => { setEditId(task._id); setEditTitle(task.title); setEditDesc(task.description || ''); setEditPriority(task.priority || 'medium'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: 13, padding: '4px 8px' }}>编辑</button>
                  <button onClick={() => handleDelete(task._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: 13, padding: '4px 8px' }}>删除</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
