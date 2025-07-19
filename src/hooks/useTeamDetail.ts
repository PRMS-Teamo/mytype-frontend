import {useParams} from "react-router-dom";
import {useUserStore} from "../store/userStore.ts";
import {useEffect, useState} from "react";
import type {Post as PostType} from "../model/Post.ts";
import axios from "axios";

export default function useTeamDetail() {
  const { id } = useParams();
  const { user } = useUserStore();
  const [post, setPost] = useState<PostType | null>(null);
  const isAuthor = user?.id && post?.userId&& user.id === post.userId;

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/posts/${id}`).then((res) => {
      setPost(res.data);
    }).catch(() => {
      alert("게시글을 불러올 수 없습니다.");
    });
  }, [id]);
  return {
    user, post, isAuthor,
  }
}