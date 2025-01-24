import { authorization } from '../constants/authorization';

const checkAuthorization = (user, entity, action) => {
  console.log("🚀 ~ checkAuthorization ~ user:", user)
  if (!user || !user.role) return false;
  return authorization[user?.role]?.[entity]?.includes(action);
};

export default checkAuthorization;
