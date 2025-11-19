import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import contentData from '../data/content.json';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'All' 
    ? contentData.galleryImages 
    : contentData.galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="page-container">
      <Sidebar 
        title="Gallery" 
        items={contentData.sidebarLinks.gallery.types}
      />
      <main className="fade-in">
        <h2>🖼️ Event Highlights</h2>
        
        {/* Category Filter */}
        <div className="search-filter-container">
          <div className="filter-dropdown">
            <label htmlFor="category-filter" style={{ marginRight: '10px' }}>
              Filter by:
            </label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {contentData.sidebarLinks.gallery.types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery">
          {filteredImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.url} alt={image.alt} />
              <div className="gallery-caption">
                <p><strong>{image.alt}</strong></p>
                <p><small>{image.category}</small></p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="content-box">
            <p>No images found in this category.</p>
          </div>
        )}

        <div className="content-box" style={{ marginTop: '30px' }}>
          <h3>📸 About Our Events</h3>
          <p>
            Explore highlights from our cybersecurity workshops, CTF competitions, 
            and community events. We regularly host training sessions and challenges 
            to help our community grow and learn together.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Gallery;
