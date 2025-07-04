import { useState } from "react";
import PostCard from "./PostCard";
import { postMock } from "../../mock/data/postMock";
import { userMock } from "../../mock/data/userMock";

interface PostCardSliderProps {
  type: "team" | "teammate";
}

export default function PostCardSlider({ type }: PostCardSliderProps) {
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  // 카드 목록 구성
  const cards =
    type === "team"
      ? postMock
          .filter((post) => post.filter === "팀원 구해요")
          .map((post, idx) => <PostCard key={`team-${idx}`} post={post} type="team" />)
      : userMock.existUser.hasProfile
        ? [
            <PostCard
              key="teammate"
              post={userMock.existUser}
              type="teammate"
            />,
          ]
        : [];

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const currentCards = cards.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  const handlePrev = () => {
    setPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  return (
    <div className="flex items-center gap-4">
      {cards.length > cardsPerPage && (
        <button onClick={handlePrev}>◀</button>
      )}

      <div className="flex gap-4">
        {currentCards}
      </div>

      {cards.length > cardsPerPage && (
        <button onClick={handleNext}>▶</button>
      )}
    </div>
  );
}
