// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import type { Post } from "../../model/Post";
//
// const TeammateList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//
//   useEffect(() => {
//     axios.get("/api/posts").then((res) => {
//       setPosts(res.data);
//     });
//   }, []);
//
//   return (
//     <div>
//       {posts.map((post) => (
//         <Link to={`/findteammate/${post.id}`} key={post.id}>
//           <div>{post.title} - {post.nickname}</div>
//         </Link>
//       ))}
//     </div>
//   );
// };
//
// export default TeammateList;

import Content from "../Post/Content.tsx";
import ProjectType from "../Post/ProjectType.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import type {Post as PostType} from "../../model/Post.ts";

const TeammateList = () => {
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
	)
}
export default TeammateList;