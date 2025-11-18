import React from 'react';

function Card({ children, className = '' }) {
  return (
    <div className={`content-box ${className}`}>
      {children}
    </div>
  );
}

export default Card;
