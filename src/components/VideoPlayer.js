import React from 'react';

function VideoPlayer({ src, title = 'Video' }) {
  // src can be a YouTube embed URL or a local /assets path
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <iframe
        title={title}
        src={src}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default VideoPlayer;
