import React from 'react';

// Article display card component
function ArticleCard({ article }) {
  return (
    <div className="api-article-card">
      <h4>{article.title}</h4>
      {article.category && <p><strong>Category:</strong> {article.category}</p>}
      {article.description && <p>{article.description}</p>}
      {article.date && <p><small>{article.date}</small></p>}
    </div>
  );
}

export default ArticleCard;
