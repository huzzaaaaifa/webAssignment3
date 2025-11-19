import React from 'react';

// Reusable content box wrapper
function Card({ children, className = '' }) {
  return (
    <div className={`content-box ${className}`}>
      {children}
    </div>
  );
}

export default Card;
