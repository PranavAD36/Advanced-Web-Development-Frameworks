import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchGithubRepos } from '../api/api';

// Practical 3 - consume a public REST API and handle loading and error states.
const GITHUB_USERNAME = 'PranavAD36';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [attempt, setAttempt] = useState(0);

  // The dependency array keeps the fetch from firing on every render.
  // Bumping `attempt` re-runs it for the retry button.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetchGithubRepos(GITHUB_USERNAME)
      .then((data) => {
        if (!cancelled) setRepos(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  if (loading) return <Spinner label="Fetching repositories..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => setAttempt((n) => n + 1)} />;

  const filtered = repos.filter((repo) =>
    repo.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <h1>Projects</h1>
      <p className="muted">
        Live repositories pulled from my GitHub profile (<strong>{GITHUB_USERNAME}</strong>)
        using the GitHub REST API.
      </p>
      <input
        className="input"
        type="search"
        placeholder="Search repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="muted">No repositories match the search.</p>
      ) : (
        <ul className="repo-list">
          {filtered.map((repo) => (
            <li key={repo.id} className="card">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              <p className="muted">{repo.description || 'No description'}</p>
              <span className="badge">{repo.stargazers_count} stars</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Projects;
