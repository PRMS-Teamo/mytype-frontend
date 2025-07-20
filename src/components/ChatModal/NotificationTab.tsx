import { useEffect, useState } from "react";
import axios from "axios";
import { useReadStateStore } from "../../store/readStore";
import useInvitations from "../../hooks/useInvitations";
import { useNavigate } from "react-router-dom";
import useTeammate from "../../hooks/useTeammate";

export default function NotificationTab() {
  const { isRead, markAsRead } = useReadStateStore();
  const { getTeammateById } = useTeammate();
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState<string | undefined>(undefined);
  const [_, setIsTeamOwner] = useState(false);
  const [displayNames, setDisplayNames] = useState<Record<string, string>>({});

  const [isTeamIdLoaded, setIsTeamIdLoaded] = useState(false);

  useEffect(() => {
    const fetchTeamId = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const meRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/me`,
          { headers }
        );
        const myId = meRes.data.id;

        const teamsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/teams`,
          { headers }
        );
        const teams = teamsRes.data;

        const ownedTeam = teams.find((team: any) => team.userId === myId);
        if (ownedTeam) {
          setTeamId(ownedTeam.teamId);
          setIsTeamOwner(true);
        } else {
          setIsTeamOwner(false);
        }
      } catch (error) {
        console.error("팀 정보 조회 실패:", error);
      } finally {
        setIsTeamIdLoaded(true); // ✅ teamId 로딩 완료
      }
    };

    fetchTeamId();
  }, []);

  const { invitations, loading, error } = useInvitations({ teamId });

  useEffect(() => {
    const fetchDisplayNames = async () => {
      const names: Record<string, string> = {};
      await Promise.all(
        invitations.map(async (item) => {
          if (item.action === "APPLY") {
            try {
              const user = await getTeammateById(item.userId);
              names[item.userId] = user.nickname || "지원자";
            } catch (error) {
              names[item.userId] = "지원자";
            }
          }
        })
      );
      setDisplayNames(names);
    };

    if (isTeamIdLoaded && invitations.length > 0) {
      fetchDisplayNames();
    }
  }, [invitations, isTeamIdLoaded]);

  if (loading || !isTeamIdLoaded)
    return <div className="text-center text-sm text-gray-400">불러오는 중...</div>;
  if (error)
    return <div className="text-center text-sm text-red-500">{error}</div>;

  const handleClick = (item: typeof invitations[number], key: string) => {
    markAsRead(key);
    if (item.action === "INVITE" && item.teamId) {
      navigate(`/findteam/${item.teamId}`);
    } else if (item.action === "APPLY") {
      navigate(`/findteammate/${item.userId}`);
    }
  };

  return (
    <div className="p-1">
      <div className="space-y-2">
        {invitations.map((item, index) => {
          const key = `notification-${index}`;
          const isItemRead = isRead(key);

          const textColor = isItemRead ? "text-[#A7A7A7]" : "text-black";
          const messageColor = isItemRead ? "text-[#A7A7A7]" : "text-gray-500";

          const messagePrefix =
            item.action === "INVITE"
              ? "초대 메시지:"
              : item.action === "APPLY"
              ? "지원자 메시지:"
              : "메시지:";

          return (
            <div
              key={index}
              onClick={() => handleClick(item, key)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1.5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold text-sm ${textColor}`}>
                    {item.postTitle || "게시글 제목 없음"}
                  </span>
                  <span className="font-semibold text-[11px] text-[#B3B3B3]">
                    {displayNames[item.userId] || item.authorName || "작성자 없음"}
                  </span>
                </div>
                <div className={`mt-2 text-xs truncate max-w-[180px] ${messageColor}`}>
                  {messagePrefix} {item.message || "내용 없음"}
                </div>
              </div>
            </div>
          );
        })}
        {invitations.length === 0 && (
          <div className="text-center text-sm text-gray-400 mt-6">
            표시할 알림이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}