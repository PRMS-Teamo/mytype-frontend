import { IoSearch } from "react-icons/io5";
import InputText from "../../components/InputText";
import PostCard from "../../components/PostCard/PostCard";
import { useEffect, useMemo, useState } from "react";
import useSearch from "../../hooks/useSearch";
import useTeammate from "../../hooks/useTeammate";
import { useTeammateStore } from "../../store/teammateStore";

function Search() {
  const {
    search,
    setSearch,
    tab,
    setTab,
    navigate,
  } = useSearch();

  const keyword = search.toLowerCase();
  const { getTeammates } = useTeammate();
  const { teammates } = useTeammateStore();
  const [posts, setPosts] = useState<any[]>([]);

  // 팀 구해요 게시글 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };

    fetchPosts();
  }, []);

  // 팀원 목록 불러오기
  useEffect(() => {
    getTeammates();
  }, []);

  const filteredPosts = useMemo(
    () =>
      Array.isArray(posts)
        ? posts.filter((post) => {
            return (
              post.title?.toLowerCase().includes(keyword) ||
              post.introduction?.toLowerCase().includes(keyword)
            );
          })
        : [],
    [posts, keyword]
  );

  const filteredUsers = useMemo(
    () =>
      teammates.filter((user) => {
        return (
          user.description?.toLowerCase().includes(keyword) ||
          user.userStacks?.some((tech) =>
            typeof tech === "string"
              ? tech.toLowerCase().includes(keyword)
              : tech.stackName?.toLowerCase().includes(keyword)
          )
        );
      }),
    [teammates, keyword]
  );

  return (
    <div className="flex flex-col items-center bg-[#fff] pt-12">
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
              tab === "팀 찾기"
                ? "bg-main text-white border-main"
                : "bg-white text-main border-main"
            }`}
            onClick={() => setTab("팀 찾기")}
          >
            팀 찾기
          </button>
          <button
            className={`px-6 py-2 rounded-full border font-semibold transition-colors duration-150 ${
              tab === "팀원 찾기"
                ? "bg-main text-white border-main"
                : "bg-white text-main border-main"
            }`}
            onClick={() => setTab("팀원 찾기")}
          >
            팀원 찾기
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
          {tab === "팀 찾기" &&
            filteredPosts.map((post) => (
              <PostCard
                key={post.teamId}
                type="team"
                post={post}
                onClick={() => navigate(`/findteam/${post.teamId}`)}
              />
            ))}

          {tab === "팀원 찾기" &&
            filteredUsers.map((user) => (
              <PostCard
                key={user.id}
                type="teammate"
                post={user}
                onClick={() => navigate(`/findteammate/${user.id}`)}
              />
            ))}

          {tab === "팀 찾기" && filteredPosts.length === 0 && (
            <div className="text-gray-400 text-sm text-center col-span-full">
              검색 결과가 없습니다.
            </div>
          )}

          {tab === "팀원 찾기" && filteredUsers.length === 0 && (
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