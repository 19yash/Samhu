export let globalClearAuth = null;

export const setGlobalClearAuth = (clearAuthFunc) => {
  globalClearAuth = clearAuthFunc;
};

// export const useClearAuth = () => {
//   if (globalClearAuth) {
//     globalClearAuth();
//   } else {
//     console.error('Navigate function not initialized!');
//   }
// };
