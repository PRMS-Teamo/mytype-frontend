import { MdHome, MdForum, MdPerson, MdGroups } from "react-icons/md";
import SidebarElement from "./SidebarElement";
import {useEffect, useState} from "react";
import Logo from "../../assets/icons/logo.svg?react";
import {useLocation, useNavigate} from "react-router-dom";
import{ URL} from "../../constants/url/url.ts"
function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<string>("대시보드");
const nav= useNavigate();
const location =useLocation()

  useEffect(()=>{
    const sidebarMenu:Record<string, string> = {
      [URL.HOME]: "대시보드",
      [URL.COMMUNITY]: "커뮤니티",
      [URL.MY_PAGE]: "마이페이지",
      [URL.MADE_PEOPLE]: "만든 사람들",
    }
    const matchedMenu = sidebarMenu[location.pathname];
    if (matchedMenu) {
      setSelectedMenu(matchedMenu);
    }
  }, [location.pathname]);
  return (
    <div className="w-64 h-screen bg-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
     <Logo onClick={()=>nav(URL.HOME)}/>
        </div>
        <nav className="space-y-2">
          <SidebarElement
            icon={<MdHome />}
            text="대시보드"
            isSelected={selectedMenu === "대시보드"}
            onClick={() => {setSelectedMenu("대시보드"); nav(URL.HOME)}}
          />
          <SidebarElement
            icon={<MdForum />}
            text="커뮤니티"
            isSelected={selectedMenu === "커뮤니티"}
            onClick={() => setSelectedMenu("커뮤니티" )}
          />
          <SidebarElement
            icon={<MdPerson />}
            text="마이페이지"
            isSelected={selectedMenu === "마이페이지"}
            onClick={() => {setSelectedMenu("마이페이지"); nav(URL.MY_PAGE)}}
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