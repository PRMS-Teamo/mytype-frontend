import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import InputText from "../../components/InputText";
import PostCard from "../../components/PostCard/PostCard";
import { postMock } from "../../mock/data/postMock";
import { userMock } from "../../mock/data/userMock";
import type { Post } from "../../model/Post";
import { useNavigate } from "react-router-dom";

type UserWithCardInfo = {
  userId: string;
  nickname: string;
  email: string;
  region: string;
  github: string;
  beginner: boolean;
  proceedMethod: string;
  position: string;
  hasProfile: boolean;
  public: boolean;
  updatedAt: string;
  introduction: string;
  techStack: string[];
};

function Search() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"팀 구해요" | "팀원 구해요">("팀 구해요");
  const navigate = useNavigate();

  const keyword = search.toLowerCase();

  const filteredPosts: Post[] = postMock.filter((post) => {
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    );
  });

  const filteredUsers: UserWithCardInfo[] = userMock.list
    .filter(
      (user): user is UserWithCardInfo =>
        typeof user.updatedAt === "string" &&
        typeof user.proceedMethod === "string" &&
        Array.isArray(user.techStack) &&
        typeof user.email === "string" &&
        typeof user.region === "string" &&
        typeof user.hasProfile === "boolean" &&
        typeof user.introduction === "string"
    )
    .filter((user) => {
      return (
        user.introduction.toLowerCase().includes(keyword) ||
        user.techStack.some((tech) => tech.toLowerCase().includes(keyword))
      );
    });

  return (
    <div className="flex flex-col items-center  bg-[#fff] pt-12">
      <div className="w-full max-w-[95vw] lg:max-w-[1200px] bg-white border border-[#E5EAF2] rounded-2xl p-4 md:p-8 flex flex-col items-center">
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-[700px] h-[64px] bg-[#F4F7FE] rounded-full px-6 py-2 flex items-center">
            <IoSearch className="text-sm text-[#2B3674] mr-2" />
            <InputText
              placeholder="검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputSize="small"
              className="w-full bg-transparent border-none shadow-none outline-none focus:ring-0 focus:outline-none text-[#8F9BBA] text-base"
            />
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
          {tab === "팀 구해요" &&
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                type="team"
                post={post}
                onClick={() => navigate(`/findteam/${post.id}`)}
              />
            ))}

          {tab === "팀원 구해요" &&
            filteredUsers.map((user) => (
              <PostCard key={user.userId} type="teammate" post={user} />
            ))}

          {tab === "팀 구해요" && filteredPosts.length === 0 && (
            <div className="text-gray-400 text-sm text-center col-span-full">
              검색 결과가 없습니다.
            </div>
          )}

          {tab === "팀원 구해요" && filteredUsers.length === 0 && (
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
