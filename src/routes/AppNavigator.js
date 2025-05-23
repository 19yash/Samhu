import React, { useEffect } from "react";
import { DefaultLayout } from "../screens/DefaultLayout.js";
import LoginForm from "../modules/auth/screens/login.js";
import SignUpForm from "../modules/auth/screens/singup.js";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import ForgotPassword from "../modules/auth/screens/ForgotPassword.js";
import ConfirmOtp from "../modules/auth/screens/ConfirmOtp.js";
import { Home } from "../screens/Home/Home.js";
import About from "../screens/About/About.js";
import EventPage from "../screens/Event/Event.js";
import ContactUs from "../screens/Contact/Contact.js";
import ResetPassword from "../modules/auth/screens/ResetPassword.js";
import { useAuth } from "../modules/auth/hooks/useAuth.js";
import EventHomeDetails from "../screens/Event/EventHomeDetails.js";

const AuthWrapper = ({ children }) => {
  const { user } = useAuth(); // Check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app/dashboard"); // Redirect to dashboard if user exists
    }
  }, [user, navigate]);

  return <>{!user && children}</>; // Render children only if no user is logged in
};
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthWrapper;

export const AppNavigator = () => {
  const routes = useRoutes([
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/events",
      element: <EventPage />,
    },
    {
      path: "/events/event-details/:eventId",
      element: <EventHomeDetails />,
    },
    {
      path: "/contactUs",
      element: <ContactUs />,
    },
    {
      path: "/login",
      element: (
        <AuthWrapper>
          <LoginForm />
        </AuthWrapper>
      ),
    },
    {
      path: "/singup",
      element: (
        <AuthWrapper>
          <SignUpForm />
        </AuthWrapper>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <AuthWrapper>
          <ForgotPassword />
        </AuthWrapper>
      ),
    },
    {
      path: "/confirm-otp/:email",
      element: (
        <AuthWrapper>
          <ConfirmOtp />
        </AuthWrapper>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <AuthWrapper>
          <ResetPassword />
        </AuthWrapper>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    // ✅ Catch-all: redirect unknown routes to "/home"
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/app/*",
      element: (
        <ProtectedRoute>
          <DefaultLayout />
        </ProtectedRoute>
      ),
    },
  ]);
  return routes;
};
