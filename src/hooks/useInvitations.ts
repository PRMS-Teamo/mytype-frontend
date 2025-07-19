import { useEffect, useState } from "react";
import axios from "axios";

interface RawInvitation {
  userId: string;
  message: string;
  applyStatus: string;
  action: "INVITE" | "APPLY";
  createdAt: string;
  updatedAt: string;
  teamPositionId?: string;
}

interface Invitation extends RawInvitation {
  postTitle?: string;
  authorName?: string;
}

export default function useInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/applies/history`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const rawData: RawInvitation[] = res.data;
      const inviteOnly = rawData.filter((item) => item.action === "INVITE");

      const enrichedInvites = await Promise.all(
        inviteOnly.map(async (item) => {
          if (!item.teamPositionId) return item;

          try {
            // 1. 팀 전체 목록 가져오기
            const teamListRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/teams`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            const allTeams = teamListRes.data;

            // 2. teamPositionId 포함한 팀 찾기
            const matchedTeam = allTeams.find((team: any) =>
              team.positions.some(
                (pos: any) => pos.positionId === item.teamPositionId
              )
            );

            if (!matchedTeam) return item;

            // 3. 팀 상세 정보 조회
            const teamDetailRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/teams/${matchedTeam.teamId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            const teamDetail = teamDetailRes.data;

            // 4. 유저 정보 조회
            const userRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/users/${teamDetail.userId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            const user = userRes.data;

            return {
              ...item,
              postTitle: teamDetail.title,
              authorName: user.nickname ?? "알 수 없음",
            };
          } catch (err) {
            console.error("초대 enrich 실패:", err);
            return item;
          }
        })
      );

      setInvitations(enrichedInvites);
    } catch (e) {
      console.error(e);
      setError("초대 내역을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return { invitations, loading, error, refetch: fetchInvitations };
}