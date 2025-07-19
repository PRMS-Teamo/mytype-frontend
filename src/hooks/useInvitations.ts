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

      // teamPositionId -> teamId -> 팀 상세 정보 가져오기
      const enrichedInvites = await Promise.all(
        inviteOnly.map(async (item) => {
          try {
            if (!item.teamPositionId) return item;

            const teamRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/teams/${item.teamPositionId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            const team = teamRes.data;
            return {
              ...item,
              postTitle: team.title,
              authorName: team.leader?.nickname ?? "알 수 없음",
            };
          } catch (e) {
            console.error("팀 정보 불러오기 실패", e);
            return item;
          }
        })
      );
      console.log("초대 데이터", res.data);
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