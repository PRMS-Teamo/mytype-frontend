import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
// import{ URL} from "./constants/url/url"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },

]);

export default router;