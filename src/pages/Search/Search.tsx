import InputText from "../../components/InputText";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const dummyPosts = [
  { title: "팀 못 구하신 분?", author: "저랑 팀해용" },
  { title: "리액트 할 줄 아는 분 구합니다.", author: "이러쿵 저러쿵." },
  { title: "백엔드 구해요", author: "이러쿵 저러쿵." },
  { title: "팀 구해요", author: "이러쿵 저러쿵." },
];

function Search() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("팀 구해요");

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#fff] pt-12">
      <div className="w-full max-w-[95vw] lg:max-w-[1200px] bg-white border border-[#E5EAF2] rounded-2xl p-4 md:p-8 flex flex-col items-center">
        {/* 검색창 */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-[700px] bg-[#F4F7FE] rounded-full px-6 py-2 flex items-center">
            <IoSearch className="text-xl text-[#3D3D3D] mr-2" />
            <InputText
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputSize="small"
              className="w-full bg-transparent border-none shadow-none outline-none focus:ring-0 focus:outline-none text-lg"
            />
          </div>
        </div>
        {/* 탭 버튼 */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            className={`px-6 py-2 rounded-full border font-semibold transition-colors duration-150 ${
              tab === "팀 구해요"
                ? "bg-main text-white border-main"
                : "bg-white text-main border-main"
            }`}
            onClick={() => setTab("팀 구해요")}
          >
            팀 구해요
          </button>
          <button
            className={`px-6 py-2 rounded-full border font-semibold transition-colors duration-150 ${
              tab === "팀원 구해요"
                ? "bg-main text-white border-main"
                : "bg-white text-main border-main"
            }`}
            onClick={() => setTab("팀원 구해요")}
          >
            팀원 구해요
          </button>
        </div>
        {/* 게시글 카드 리스트 */}
        <div className="flex flex-col gap-4 items-center w-full">
          {dummyPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl px-8 py-6 shadow-sm w-full max-w-[700px]"
            >
              <div className="font-bold text-lg mb-1">{post.title}</div>
              <div className="text-gray-500 text-sm">{post.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
