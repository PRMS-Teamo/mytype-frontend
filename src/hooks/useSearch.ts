import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Post} from "../model/Post.ts";
import {postMock} from "../mock/data/postMock.ts";

export default function useSearch() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"팀 찾기" | "팀원 찾기">("팀 찾기");
  const navigate = useNavigate();

  const keyword = search.toLowerCase();

  const filteredPosts: Post[] = postMock.filter((post) => {
    return (
      post.title.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    );
  });
  return {
    keyword,
    search,
    setSearch,
    tab,
    setTab,
    filteredPosts,
    navigate,
  }
}