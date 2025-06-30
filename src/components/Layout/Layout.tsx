import Sidebar from "../Sidebar";
import Header from "../Header";
import KakaoLoginModal from "../KakaoLoginModal";
import { Outlet } from "react-router-dom";
import ToggleModal from "../ChatModal/ToggleModal";

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="flex-1 overflow-auto px-6 py-4">
          <Outlet />
        </main>
        <ToggleModal />
      </div>
      <KakaoLoginModal />
    </div>
  );
}

export default Layout;
