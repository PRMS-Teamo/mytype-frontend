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
    <div className="overflow-x-auto">
      <div className="w-[1140px] grid grid-cols-3 gap-6 p-10 mt-8">
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
    </div>
  );
}