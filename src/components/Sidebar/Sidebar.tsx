import { MdHome, MdForum, MdPerson, MdGroups } from "react-icons/md";
import SidebarElement from "./SidebarElement";
import { useState } from "react";
import logoUrl from "../../assets/icons/logo.svg";

function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<string>("대시보드");

  return (
    <div className="w-64 h-screen bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={logoUrl} alt="프로그래머스 로고" className="w-7 h-7" />
          <h1 className="text-xl font-bold text-dark">프로그래머스</h1>
        </div>
        <nav className="space-y-2">
          <SidebarElement
            icon={<MdHome />}
            text="대시보드"
            isSelected={selectedMenu === "대시보드"}
            onClick={() => setSelectedMenu("대시보드")}
          />
          <SidebarElement
            icon={<MdForum />}
            text="커뮤니티"
            isSelected={selectedMenu === "커뮤니티"}
            onClick={() => setSelectedMenu("커뮤니티")}
          />
          <SidebarElement
            icon={<MdPerson />}
            text="마이페이지"
            isSelected={selectedMenu === "마이페이지"}
            onClick={() => setSelectedMenu("마이페이지")}
          />
          <SidebarElement
            icon={<MdGroups />}
            text="만난 사람들"
            isSelected={selectedMenu === "만든 사람들"}
            onClick={() => setSelectedMenu("만든 사람들")}
          />
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
