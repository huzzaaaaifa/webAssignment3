import React from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';

// About page with company information
function About() {
  return (
    <div className="page-container">
      <Sidebar 
        title="About" 
        items={contentData.sidebarLinks.about.sections}
      />
      <main className="fade-in">
        <h2>About {contentData.siteInfo.name}</h2>
        <p>{contentData.aboutInfo.mission}</p>

        <blockquote>"{contentData.aboutInfo.quote}"</blockquote>

        <dl>
          <dt>Founded</dt>
          <dd>{contentData.aboutInfo.founded}</dd>
          
          <dt>Focus Areas</dt>
          <dd>{contentData.aboutInfo.focusAreas}</dd>
          
          <dt>Community</dt>
          <dd>{contentData.aboutInfo.community}</dd>
        </dl>

        <div className="content-row" style={{ marginTop: '30px' }}>
          <div className="content-box">
            <h3>Our Mission</h3>
            <p>
              To empower individuals and organizations with the knowledge and tools 
              needed to defend against cyber threats through practical, hands-on education.
            </p>
          </div>
          <div className="content-box">
            <h3>Our Vision</h3>
            <p>
              A world where cybersecurity knowledge is accessible to everyone, 
              creating a safer digital environment for all.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
