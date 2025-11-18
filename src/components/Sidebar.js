import React from 'react';

// Simplified Sidebar: accepts either an array of items or an object where
// each key is a section title and the value is an array of items.
// This keeps usage flexible while keeping the component small.
function Sidebar({ items, title }) {
  if (!items) return null;

  const renderList = (list) => (
    <ul className="sidebar-list">
      {list.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );

  return (
    <aside>
      {title && <h2>{title}</h2>}

      {Array.isArray(items) && renderList(items)}

      {!Array.isArray(items) && typeof items === 'object' && (
        Object.entries(items).map(([sectionTitle, list], idx) => (
          <div key={idx}>
            <h2>{sectionTitle}</h2>
            {Array.isArray(list) ? renderList(list) : null}
          </div>
        ))
      )}
    </aside>
  );
}

export default Sidebar;
