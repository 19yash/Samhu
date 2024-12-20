import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import privateRoutes from '../routes/PrivateRoutes';

const resolveRoute = (route, idx) => {
  return (
    route.element && (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={route.element}
      >
        {route.children &&
          route.children.map((childRoute, idx) => {
            return resolveRoute(childRoute, idx);
          })}
      </Route>
    )
  );
};

const AppContent = ({ children }) => {
  // later pick it up from ciontext ;
  const user = {};
  const visibleRoutes = privateRoutes.filter((route) => {
    let { visible = true } = route;
    if (typeof visible === 'function') {
      visible = visible(user);
    }
    return visible;
  });
  console.log('🚀 ~ visibleRoutes ~ visibleRoutes:', visibleRoutes);
  return (
    <Routes>
      {visibleRoutes.map((route, idx) => {
        return resolveRoute(route, idx);
      })}
      <Route path="*" element={<Navigate to={'/dashboard'} replace />} />
    </Routes>
  );
};

export default AppContent;
