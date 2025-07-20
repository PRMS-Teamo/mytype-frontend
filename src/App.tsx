import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import {Suspense} from "react";
const App = () => {
  return (
    <Suspense fallback={<div>로딩 중입니다</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;