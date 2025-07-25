import {
  MdHome,
  MdGroupAdd,
  MdSearch,
  MdAccountCircle,
  MdEmojiPeople,
} from "react-icons/md";
import SidebarElement from "./SidebarElement";
import { useEffect, useState } from "react";
import Logo from "../../assets/icons/logo.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../constants/url/url.ts";
function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<string>("대시보드");
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sidebarMenu: Record<string, string> = {
      [URL.HOME]: "대시보드",
      [URL.FIND_TEAM]: "팀 찾기",
      [URL.FIND_TEAMMATE]: "팀원 찾기",
      [URL.MY_PAGE]: "마이페이지",
      [URL.MY_TEAM_INFO]: "내 팀 정보",
      [URL.MADE_PEOPLE]: "만든 사람들",
    };
    const matchedMenu = sidebarMenu[location.pathname];
    if (matchedMenu) {
      setSelectedMenu(matchedMenu);
    }
  }, [location.pathname]);
  return (
    <div className="w-64 h-screen bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Logo onClick={() => nav(URL.HOME)} />
        </div>
        <nav className="space-y-2">
          <SidebarElement
            icon={<MdHome />}
            text="대시보드"
            isSelected={selectedMenu === "대시보드"}
            onClick={() => {
              setSelectedMenu("대시보드");
              nav(URL.HOME);
            }}
          />
          <SidebarElement
            icon={<MdSearch />}
            text="팀 찾기"
            isSelected={selectedMenu === "팀 찾기"}
            onClick={() => {
              setSelectedMenu("팀 찾기");
              nav(URL.FIND_TEAM);
            }}
          />
          <SidebarElement
            icon={<MdGroupAdd />}
            text="팀원 찾기"
            isSelected={selectedMenu === "팀원 찾기"}
            onClick={() => {
              setSelectedMenu("팀원 찾기");
              nav(URL.FIND_TEAMMATE);
            }}
          />
          <SidebarElement
            icon={<MdAccountCircle />}
            text="마이페이지"
            isSelected={selectedMenu === "마이페이지"}
            onClick={() => {
              setSelectedMenu("마이페이지");
              nav(URL.MY_PAGE);
            }}
          />
          <SidebarElement
            icon={<MdAccountCircle />}
            text="내 팀 정보"
            isSelected={selectedMenu === "내 팀 정보"}
            onClick={() => {
              setSelectedMenu("내 팀 정보");
              nav(URL.MY_TEAM_INFO);
            }}
          />
          <SidebarElement
            icon={<MdEmojiPeople />}
            text="만든 사람들"
            isSelected={selectedMenu === "만든 사람들"}
            onClick={() => {
              setSelectedMenu("만든 사람들");
              nav(URL.MADE_PEOPLE);
            }}
          />
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
