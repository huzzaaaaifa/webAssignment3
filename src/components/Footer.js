import React from 'react';
import contentData from '../data/content.json';

function Footer() {
  return (
    <footer>
      <p>© {contentData.siteInfo.year} {contentData.siteInfo.name} | Built with React</p>
    </footer>
  );
}

export default Footer;
