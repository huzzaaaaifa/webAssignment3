import React from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';

/* ========================================
   ASSIGNMENT REQUIREMENTS SATISFIED:
   ========================================
    Local JSON: content.json loaded
    Video Embed: YouTube iframe below
   ======================================== */

function Home() {
  return (
    <div className="page-container">
      <Sidebar 
        title="Topics" 
        items={contentData.topics}
        subtitle="Tools"
      />
      <main className="fade-in">
        <div className="hero">
          {/* Local JSON - Site info loaded from content.json */}
          <h2>Welcome to {contentData.siteInfo.name}</h2>
          <p>{contentData.siteInfo.tagline}</p>
        </div>

        <div className="content-row">
          <div className="content-box">
            <h3>Announcements</h3>
            {/* Local JSON - Announcements from content.json */}
            <ul>
              {contentData.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </div>
          <div className="content-box">
            <h3>Quick Links</h3>
            {/* Local JSON - Quick links from content.json */}
            <ul>
              {contentData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="table-section">
          <h3>Recent Articles</h3>
          {/* Local JSON - Articles from content.json */}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contentData.recentArticles.slice(0, 3).map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="extra-content">
          <p>
            Explore more tutorials, hands-on labs, and challenges in the Articles section. 
            Stay updated with the latest in cybersecurity!
          </p>
        </div>
        
        {/* Video Embed - YouTube iframe */}
        <div className="content-box" style={{ marginTop: 20 }}>
          <h3>Introduction Video</h3>
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              title="Intro Video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
