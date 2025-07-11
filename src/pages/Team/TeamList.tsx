import { useNavigate } from "react-router-dom";
import { postMock } from "../../mock/data/postMock";
import PostCard from "../../components/PostCard/PostCard";

export default function TeamList() {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/findteam/${id}`);
  };

  const sortedPosts = [...postMock].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full max-w-[1150px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 p-6">
      {sortedPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => handleClick(post.id)}
          className="cursor-pointer"
        >
          <PostCard type="team" post={post} />
        </div>
      ))}
    </div>
  );
}