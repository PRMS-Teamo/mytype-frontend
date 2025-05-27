import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
