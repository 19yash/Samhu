import React from 'react';

const View = ({ children, customStyles, ...props }) => {
  const defaultStyles = {
    display: 'flex',
    flexDirection: 'column',
  };

  const combinedStyles = { ...defaultStyles, ...customStyles };

  return (
    <div style={combinedStyles} {...props}>
      {children}
    </div>
  );
};

export default View;