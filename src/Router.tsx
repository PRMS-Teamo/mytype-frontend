import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Post from "./pages/Post/Post";
import TeamList from "./pages/Team/TeamList";
import TeamDetail from "./pages/Team/TeamDetail";
import TeammateList from "./pages/Teammate/TeammateList";
import TeammateDetail from "./pages/Teammate/TeammateDetail";


import MyPage from "./pages/MyPage";

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
        path: "mypage",
        element: <MyPage />,
      },
      {path:"post",element:<Post/>
      },
      {
        path: "team",
        children: [
          { index: true, element: <TeamList /> },
          { path: ":id", element: <TeamDetail /> },

          // { path: "write", element: <TeamWrite /> },
        ],
      },
      {
        path: "teammate",
        children: [
          { index: true, element: <TeammateList /> },
          { path: ":id", element: <TeammateDetail /> },
          // { path: "write", element: <TeammateWrite /> },
        ],
       },
      {path:"post",
      }
    ]}
]);

export default router;