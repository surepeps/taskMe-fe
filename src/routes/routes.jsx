import React from "react";
import AuthMiddleware from "../middleware/AuthMiddleware";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/pages/Dashboard";
import AddTask from "../components/pages/AddTask";


const createRoute = (path, element, pageName, privateRoute = true) => ({
  path,
  element: (
    <AuthMiddleware
      path={path}
      pageName={pageName}
      privateRoute={privateRoute}
      component={element}
    />
  ),
});

const routes = [
  createRoute("/login", Login, "Login", false),
  createRoute("/register", Register, "Register", false),
  createRoute("/", Dashboard, "Dashboard", true),
  createRoute("/add/task", AddTask, "Add New Task", true),
  createRoute("/logout", Dashboard, "Dashboard", true),

];

export default routes;
