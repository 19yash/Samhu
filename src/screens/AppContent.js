import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import privateRoutes from '../routes/PrivateRoutes';
import { AppContentStyle } from './AppContent.style';
import { useAuth } from '../modules/auth/hooks/useAuth';

const resolveRoute = (route, idx) => {
  return (
    route.element && (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={
          <>
            <ProtectedRoute>
              {route.element} <Outlet />
            </ProtectedRoute>
          </>
        }
      >
        {route.children &&
          route.children.map((childRoute, idx) => {
            return resolveRoute(childRoute, idx);
          })}
      </Route>
    )
  );
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const AppContent = ({ children }) => {
  // later pick it up from ciontext ;
  const { user } = useAuth();
  const visibleRoutes = privateRoutes.filter((route) => {
    let { visible = true } = route;
    if (typeof visible === 'function') {
      visible = visible(user);
    }
    return visible;
  });
  return (
    <AppContentStyle>
      <Routes>
        {visibleRoutes.map((route, idx) => {
          return resolveRoute(route, idx);
        })}
        <Route path="*" element={<Navigate to={'/dashboard'} replace />} />
      </Routes>
    </AppContentStyle>
  );
};

export default AppContent;
