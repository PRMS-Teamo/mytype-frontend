import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import { useTeammateStore } from "../../store/teammateStore";
import useTeammate from "../../hooks/useTeammate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useTeamList from "../../hooks/useTeamList.ts";

interface PostCardSliderProps {
  type: "team" | "teammate";
}

export default function PostCardSlider({ type }: PostCardSliderProps) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const cardsPerPage = 3;

  const { teammates } = useTeammateStore();
  const { getTeammates } = useTeammate();
  const teams = useTeamList();
  useEffect(() => {
    if (type === "teammate") {
      getTeammates();
    }

  }, [type]);

  const teamCards =teams
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map((team, idx) => (
      <PostCard
        key={`team-${idx}`}
        type="team"
        post={team}
        onClick={() => navigate(`/findteam/${team.teamId}`)}
      />
    ));
  const teammateCards = teammates
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .map((user, idx) => (
      <PostCard
        key={`teammate-${idx}`}
        post={user}
        type="teammate"
        onClick={() => navigate(`/findteammate/${user.id}`)}
      />
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

      <div className="flex gap-4">{currentCards}</div>

      {cards.length > cardsPerPage && (
        <button onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}