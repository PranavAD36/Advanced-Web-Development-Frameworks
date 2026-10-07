import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { createTask, deleteTask, getTasks, updateTask } from '../api/api';

// Practical 6 - full-stack CRUD. Every call hits our own Express/MongoDB API.
const EMPTY_FORM = { title: '', description: '', priority: 'medium' };

function pickEditable(task) {
  return {
    title: task.title,
    description: task.description || '',
    priority: task.priority || 'medium',
    completed: task.completed,
  };
}

function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  async function loadTasks() {
    setLoading(true);
    setError('');
    try {
      setTasks(await getTasks());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await createTask(form);
      setForm(EMPTY_FORM);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(task) {
    setError('');
    try {
      await updateTask(task._id, { ...pickEditable(task), completed: !task.completed });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError('');
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(task) {
    setEditingId(task._id);
    setEditForm(pickEditable(task));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await updateTask(editingId, editForm);
      setEditingId(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <h1>Task Manager</h1>
      <p className="muted">
        Signed in as <strong>{user?.email}</strong>. Create, update and delete your tasks -
        secured with JWT authentication and cached for fast reads.
      </p>

      <form className="card form" onSubmit={handleCreate}>
        <h2>New task</h2>
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="input"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add task'}
        </button>
      </form>

      {error && <ErrorMessage message={error} onRetry={loadTasks} />}

      {loading ? (
        <Spinner label="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet. Create your first one above.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="card task-item">
              {editingId === task._id ? (
                <form className="form" onSubmit={handleUpdate}>
                  <input
                    className="input"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    required
                  />
                  <input
                    className="input"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <select
                    className="input"
                    value={editForm.priority}
                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <div className="row">
                    <button className="btn" type="submit" disabled={saving}>
                      Save
                    </button>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task)}
                    aria-label="Toggle completed"
                  />
                  <div className="task-main">
                    <span className={task.completed ? 'task-title done' : 'task-title'}>
                      {task.title}
                    </span>
                    {task.description && <p className="muted">{task.description}</p>}
                  </div>
                  <span className={`badge badge-${task.priority}`}>{task.priority}</span>
                  <button className="btn btn-ghost" type="button" onClick={() => startEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tasks;
