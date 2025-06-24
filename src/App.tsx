import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { useEffect } from "react";

const App = () => {
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
      console.log('✅ SDK 로드됨, 키:', appKey); 
  
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
        console.log('✅ Kakao SDK 초기화 완료');
      }
    };
    document.head.appendChild(script);
  }, []);
  

  return (
    <RouterProvider router={router} />
    // <div className="text-xl font-bold text-main ">Hi</div>
  );
};
export default App;
