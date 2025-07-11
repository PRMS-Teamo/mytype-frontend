import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Post as PostType } from "../../model/Post";
import Content from "./Content";
import ProjectType from "./ProjectType";

const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState<PostType | null>(null);

	useEffect(() => {
		if (!id) return;
		axios.get(`/api/posts/${id}`).then((res) => {
			setPost(res.data);
		}).catch(() => {
			alert("게시글을 불러올 수 없습니다.");
		});
	}, [id]);

	if (!post) return <div className="p-12">게시글이 없습니다.</div>;

	return (
		<div className="border border-gray-300 rounded-lg h-full">
			<div className="m-12">
				<Content post={post} />
				<ProjectType post={post} />
			</div>
		</div>
	);
};

export default Post;