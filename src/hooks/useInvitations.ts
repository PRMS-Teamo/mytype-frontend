import { useEffect, useState } from "react";
import axios from "axios";

interface RawInvitation {
  userId: string;
  message?: string;
  applyStatus: string;
  action: "INVITE" | "APPLY";
  createdAt: string;
  updatedAt: string;
  reply?: string;
  isRead: boolean;
  teamPosition?: {
    teamPositionId?: string;
    team?: {
      teamId: string;
      title: string;
      recruitStatus: string;
    };
    position?: {
      positionId: string;
      positionName: string;
    };
  };
}

interface Invitation extends RawInvitation {
  postTitle?: string;
  authorName?: string;
  teamId?: string;
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

      const enriched = await Promise.all(
        rawData.map(async (item) => {
          const teamId = item.teamPosition?.team?.teamId;
          const title = item.teamPosition?.team?.title;

          let authorName: string | undefined;

          try {
            if (teamId) {
              const teamDetailRes = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );

              const teamDetail = teamDetailRes.data;

              const userRes = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/${teamDetail.userId}`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );

              const user = userRes.data;
              authorName = user.nickname ?? "알 수 없음";
            }
          } catch (err) {
            console.error("enrich 실패:", err);
          }

          return {
            ...item,
            teamId,
            postTitle: title,
            authorName,
          };
        })
      );

      setInvitations(enriched);
    } catch (e) {
      console.error(e);
      setError("알림을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  return { invitations, loading, error, refetch: fetchInvitations };
}