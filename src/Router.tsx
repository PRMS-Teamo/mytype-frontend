import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Post from "./pages/Post/Post";
import TeamList from "./pages/Team/TeamList";
import TeamDetail from "./pages/Team/TeamDetail";
import TeammateList from "./pages/Teammate/TeammateList";
import MyPage from "./pages/MyPage";
import Search from "./pages/Search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "mypage",
        element: <MyPage />,     
      },
      {
        path: "findteam",
        children: [
          { index: true, element: <TeamList /> },
          { path: ":id", element: <TeamDetail /> },
          // { path: "write", element: <TeamWrite /> },
        ],
      },
      {
        path: "findteammate",
        children: [
          { index: true, element: <TeammateList /> },
          { path: ":id", element: <Post /> },
          // { path: "write", element: <TeammateWrite /> },
        ],
      },
      { path: "post" },
    ],
  },
]);

export default router;
