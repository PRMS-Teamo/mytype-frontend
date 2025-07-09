import axios from "axios";
import { usePostStore } from "../store/postStore";
import type { CreatePost, Post } from "../model/Post";

export const useMockPost = () => {
	const { addPost } = usePostStore();

	const add = async (newPost: CreatePost) => {
		try {
			const response = await axios.post<Post>("/api/posts", newPost);
			addPost(response.data);
		} catch (error) {
			console.error("포스트 등록 실패", error);
		}
	};

	return { add };
};