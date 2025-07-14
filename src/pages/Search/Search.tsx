import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import InputText from "../../components/InputText";
import PostCard from "../../components/PostCard/PostCard";
import { postMock } from "../../mock/data/postMock";
import type { Post } from "../../model/Post";

function Search() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("팀 구해요");


  const filteredPosts: Post[] = postMock.filter((post) => {
    const keyword = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    );
  });

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

        {/* PostCard 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              type="team"
              post={post}
            />
          ))}
          {filteredPosts.length === 0 && (
            <div className="text-gray-400 text-sm text-center col-span-full">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;