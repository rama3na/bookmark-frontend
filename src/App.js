import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/userinfo/Home";
import Adduser from "./components/userinfo/Adduser";
import UserList from "./components/userinfo/UserList";
import Rootlayout from "./Rootlayout";
import Register from "./components/userinfo/Register";
import Login from "./components/userinfo/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/adduser", element: <Adduser /> },
        { path: "/userlist", element: <UserList /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
