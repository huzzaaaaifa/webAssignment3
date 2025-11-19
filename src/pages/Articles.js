import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';
import ArticleCard from '../components/ArticleCard';

// Articles page with API integration
function Articles() {
  const [articles, setArticles] = useState([]);
  const [apiArticles, setApiArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setArticles(contentData.recentArticles);
    fetchCyberSecurityNews();
  }, []);
  const fetchCyberSecurityNews = async () => {
    try {
      setLoading(true);
      
      // Using JSONPlaceholder as a free public API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      const data = await response.json();
      
      // Transform the data to match our article structure
      const transformedArticles = data.map((post, index) => ({
        id: post.id,
        title: post.title,
        description: post.body.substring(0, 100) + '...',
        category: ['Network', 'Web', 'Forensics', 'Malware'][index % 4],
        date: 'Nov 2025',
        source: 'API'
      }));
      
      setApiArticles(transformedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on search and category
  const filteredArticles = [...articles, ...apiArticles].filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <Sidebar 
        title="Categories" 
        items={contentData.sidebarLinks.articles.categories}
      />
      <main className="fade-in">
        <h2>📰 Latest Articles</h2>
        
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {contentData.categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && <div className="loading">Loading articles from API... ⏳</div>}

        {/* Local Articles Table */}
        <div className="table-section">
          <h3>Featured Articles (Local Data)</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles
                .filter(article => !article.source)
                .map((article) => (
                  <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.category}</td>
                    <td>{article.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* API Articles */}
        {apiArticles.length > 0 && (
          <div>
            <h3>🌐 Latest Cybersecurity News (API Data)</h3>
            <div className="api-articles">
              {filteredArticles
                .filter(article => article.source === 'API')
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="content-box">
            <p>No articles found matching your criteria.</p>
          </div>
        )}

        <div className="extra-content">
          <p>
            Check out our collection of in-depth articles covering practical cybersecurity topics. 
            Articles are loaded from both local JSON data and external APIs.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Articles;
