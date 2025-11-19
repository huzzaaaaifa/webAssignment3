import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';

/* ========================================
   ASSIGNMENT REQUIREMENTS SATISFIED:
   ========================================
   TASK 2: GitHub Search Implementation
   Public API: GitHub Search API integration
   React Hooks: useState
   ======================================== */

function GitHubSearch() {
  // 1. React Hooks (useState)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. TASK 2 - GitHub Search API integration
  // 3. Public API - Fetch GitHub users
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      // GitHub Search API - free public API
      const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=12`);
      if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch GitHub users. You may be rate-limited.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar title="Search GitHub" items={contentData.sidebarLinks.home.topics} />
      <main className="fade-in">
        <h2>Search GitHub Users</h2>

        <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
          <div className="search-filter-container">
            <div className="search-bar">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter username or keyword..."
              />
            </div>
            <div style={{ minWidth: 120 }}>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {results.map(user => (
            <div key={user.id} className="content-box">
              <img src={user.avatar_url} alt={user.login} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} />
              <h4 style={{ marginTop: 10 }}>{user.login}</h4>
              <p><a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a></p>
            </div>
          ))}
        </div>

        {results.length === 0 && !loading && (
          <div className="content-box" style={{ marginTop: 20 }}>
            <p>No results yet. Try searching for "octocat" or your classmates' usernames.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default GitHubSearch;
