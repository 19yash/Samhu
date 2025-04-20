export let globalClearAuth = null;

export const setGlobalClearAuth = (clearAuthFunc) => {
  globalClearAuth = clearAuthFunc;
};