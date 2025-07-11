import axios from "axios";
import { usePostStore } from "../store/postStore";
import type { Post } from "../model/Post";

export const useMockPost = () => {
	const { setMyPost } = usePostStore();

	const loadMyPost = async (id: string) => {
		try {
			const response = await axios.get<Post>(`/api/posts/${id}`);
			setMyPost(response.data);
		} catch (error) {
			console.error("내 포스터 가져오기 실패", error);
		}
	};
	const add = async (myPost: Post) => {
		try {
			const response = await axios.post<Post>("/api/posts", myPost);
			console.log("add 성공:", response.data);
			setMyPost(response.data);
		} catch (error) {
			console.error("포스트 등록 실패", error);
		}
	};

	const edit = async (myPost:Post) => {
		try {
			const response = await axios.patch(`/api/posts/${myPost.id}`, myPost);
			console.log("edit 성공:", response.data);
			setMyPost(response.data);
		} catch (error) {
			console.error("포스트 수정 실패", error);
		}
	};

	return { loadMyPost, add, edit };
};