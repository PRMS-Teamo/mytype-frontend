import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
<<<<<<< feat/#11-Header
import TeamList from "./pages/Team/TeamList";
import TeamDetail from "./pages/Team/TeamDetail";
import TeamWrite from "./pages/Team/TeamWrite";
import TeammateList from "./pages/Teammate/TeammateList";
import TeammateDetail from "./pages/Teammate/TeammateDetail";
import TeammateWrite from "./pages/Teammate/TeammateWrite";


=======
import MyPage from "./pages/MyPage";
// import{ URL} from "./constants/url/url"
>>>>>>> develop
const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
<<<<<<< feat/#11-Header
    element: <Layout />, 
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "team",
        children: [
          { index: true, element: <TeamList /> },
          { path: ":id", element: <TeamDetail /> },
          { path: "write", element: <TeamWrite /> },
        ],
      },
      {
        path: "teammate",
        children: [
          { index: true, element: <TeammateList /> },
          { path: ":id", element: <TeammateDetail /> },
          { path: "write", element: <TeammateWrite /> },
        ],
=======
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
>>>>>>> develop
      },
    ],
  },

]);

export default router;