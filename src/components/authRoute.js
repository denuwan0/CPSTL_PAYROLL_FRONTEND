import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function authRoute({ component: Component, allowedRoles }) {
  return (
    <Route
      render={(props) => {
        if (!allowedRoles) {
          // Redirect to the login page if user is not authenticated
          return <Redirect to="/login" />;
        }

        // Check if the user has the necessary role to access the route
        if (!allowedRoles.includes(user.role)) {
          // Redirect to a different page or display an unauthorized message
          return <Redirect to="/unauthorized" />;
        }

        // If authenticated and has necessary role, render the component
        return <Component {...props} />;
      }}
    />
  );
}
