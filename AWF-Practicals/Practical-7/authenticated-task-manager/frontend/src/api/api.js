const BASE_URL = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token') || '';
}

function getHeaders(extra = {}) {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, { ...options, headers: getHeaders(options.headers) });
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return res.json();
}

export const registerUser = (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
export const loginUser = (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const getMe = () => request('/auth/me');
export const getTasks = () => request('/tasks');
export const createTask = (data) => request('/tasks', { method: 'POST', body: JSON.stringify(data) });
export const updateTask = (id, data) => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
