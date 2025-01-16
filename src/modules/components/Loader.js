// src/components/Loader.js
import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div class="loader"></div>
    </div>
  );
};

// Basic CSS styles for the loader
const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: '90vh',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTop: '4px solid #FF914D',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

/* HTML: <div class="loader"></div> */
// .loader {
//   width: 50px;
//   aspect-ratio: 1;
//   border-radius: 50%;
//   background:
//     radial-gradient(farthest-side,#ffa516 94%,#0000) top/8px 8px no-repeat,
//     conic-gradient(#0000 30%,#ffa516);
//   -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
//   animation: l13 1s infinite linear;
// }
// @keyframes l13{
//   100%{transform: rotate(1turn)}
// }
export default Loader;
