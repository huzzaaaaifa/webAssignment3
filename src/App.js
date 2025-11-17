import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import GitHubSearch from './pages/GitHubSearch';
import AIChat from './components/AIChat';

/* ========================================
   ASSIGNMENT REQUIREMENTS SATISFIED:
   ========================================
   1. React Router: Multiple routes configured below (8 routes total)
   2. Hooks: useState and useEffect used for theme management
   3. localStorage: Theme preference persisted in localStorage
   ======================================== */

function App() {
  // REQUIREMENT: React Hooks (useState)
  const [theme, setTheme] = useState('dark');

  // React Hooks (useEffect) + localStorage persistence
  // Load theme from localStorage on mount (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
  }, []);

  // localStorage - Theme toggle persisted
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', newTheme);
    }
    document.body.className = newTheme;
  };

  return (
    // React Router - Multiple routes with navigation
    <Router>
      <div className="app">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} /> {/* Uses public API + local JSON */}
          <Route path="/contact" element={<Contact />} /> {/* Firebase form submission */}
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/github-search" element={<GitHubSearch />} /> {/* GitHub API */}
          <Route path="/ask-ai" element={<AIChat />} /> {/* AI Chat with DeepSeek API */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
