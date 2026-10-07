// Base URL of the Express backend. Override with VITE_API_URL if needed.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token') || '';
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || `Request failed with status ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
}

// Practical 7 - authentication
export const registerUser = (payload) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const loginUser = (payload) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const getMe = () => request('/auth/me');

// Practical 6 - task CRUD against our own backend
export const getTasks = () => request('/tasks');
export const createTask = (payload) =>
  request('/tasks', { method: 'POST', body: JSON.stringify(payload) });
export const updateTask = (id, payload) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' });

// Practical 3 - consume a public REST API (GitHub)
export async function fetchGithubRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
  );
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
