import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Intro from "./pages/Intro";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;