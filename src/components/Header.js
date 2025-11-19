import React from 'react';
import { NavLink } from 'react-router-dom';
import contentData from '../data/content.json';

// Navigation header with theme toggle
function Header({ theme, toggleTheme }) {
  return (
    <header>
      <nav>
        <h1>{contentData.siteInfo.name}</h1>
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className={({ isActive }) => isActive ? 'active' : ''}>
                Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/github-search" className={({ isActive }) => isActive ? 'active' : ''}>
                GitHub Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/ask-ai" className={({ isActive }) => isActive ? 'active' : ''}>
                Ask AI
              </NavLink>
            </li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
