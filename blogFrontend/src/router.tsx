import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "create", element: <CreatePage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
