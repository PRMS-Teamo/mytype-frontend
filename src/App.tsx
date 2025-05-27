import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const App = () => {
  return (
    <RouterProvider router={router} />
    // <div className="text-xl font-bold text-main ">Hi</div>
  );
};
export default App;
