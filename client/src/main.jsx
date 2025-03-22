import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Rootlayout from "./components/Rootlayout.jsx";
import Home from "./components/common/Home.jsx";
import Signin from "./components/common/Signin.jsx";
import Signup from "./components/common/Signup.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import AdminProfile from "./components/admin/AdminProfile.jsx";
import Articles from "./components/common/Articles.jsx";
import ArticleByID from "./components/common/ArticleByID.jsx";
import AuthorProfile from "./components/author/AuthorProfile.jsx";
import PostArticle from "./components/author/PostArticle.jsx";
import UserAuthorContext from "./contexts/UserAuthorContext.jsx";
import Blocked from "./components/admin/Blocked.jsx";

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signout",
        element: <Home />,
      },
      {
        path: "articles/:articleId",
        element: <ArticleByID />,
      },
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: "articles/:articleId",
            element: <ArticleByID />,
          },
          {
            path: "",
            element: <Articles />,
          },
        ],
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: "articles/:articleId",
            element: <ArticleByID />,
          },
          {
            path: "article",
            element: <PostArticle />,
          },
          {
            path: "",
            element: <Articles />,
          },
        ],
      },
      {
        path: "admin-profile/:email",
        element: <AdminProfile />,
        children: [
          {
            path: "users",
            element: <AdminProfile />,
          },
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: "",
            element: <Articles />,
          },
        ],
      },
      {
        path: "blocked",
        element: <Blocked />,
      },

      {
        path: "author-profile",
        element: <Articles />,
        children: [
          {
            path: "articles/:articleId",
            element: <ArticleByID />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthorContext>
      <RouterProvider router={browserRouterObj} />
    </UserAuthorContext>
  </StrictMode>,
);
