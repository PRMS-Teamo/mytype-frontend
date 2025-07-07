import { useState } from "react";
import PostCard from "./PostCard";
import { postMock } from "../../mock/data/postMock";
import { userMock } from "../../mock/data/userMock";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PostCardSliderProps {
  type: "team" | "teammate";
}

export default function PostCardSlider({ type }: PostCardSliderProps) {
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;

  const teamCards =
    postMock
      .filter((post) => post.filter === "팀원 구해요")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post, idx) => (
        <PostCard key={`team-${idx}`} post={post} type="team" />
      ));

  const teammateCards =
    userMock.list
      .filter((user) => user.hasProfile)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .map((user, idx) => (
        <PostCard key={`teammate-${idx}`} post={user} type="teammate" />
      ));

  const cards = type === "team" ? teamCards : teammateCards;

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
        <button onClick={handlePrev}>
          <IoIosArrowBack />
        </button>
      )}

      <div className="flex gap-4">
        {currentCards}
      </div>

      {cards.length > cardsPerPage && (
        <button onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
