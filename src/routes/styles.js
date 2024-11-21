export const navigationStyle = ({ theme: { colors } = {} } = {}) => {
  return {
    leftMenu: {
      flex: 1,
      backgroundColor: '#FFF',
      overflow: 'hidden',
    },
    sm: {
      stack: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        padding: 16,
      },
    },
    md: {
      stack: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        padding: 20,
      },
    },
    modal: {
      backgroundColor: '#FFF',
    },
  };
};
