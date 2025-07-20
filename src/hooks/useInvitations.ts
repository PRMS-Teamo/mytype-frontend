import { useEffect, useState } from "react";
import axios from "axios";
// import { useUserStore } from "../store/userStore";

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
      userId: string;
    };
    position?: {
      positionId: string;
      positionName: string;
    };
  };
}

interface UseInvitationsOptions {
  teamId?: string;
}
interface Invitation extends RawInvitation {
  postTitle?: string;
  authorName?: string;
  teamId?: string;
}

export default function useInvitations({ teamId }: UseInvitationsOptions = {}) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { user } = useUserStore();

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");

      const url = teamId
        ? `${import.meta.env.VITE_BACKEND_URL}/applies/teams/${teamId}/history`
        : `${import.meta.env.VITE_BACKEND_URL}/applies/history`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

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
              authorName = userRes.data.nickname ?? "알 수 없음";
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
  }, [teamId]);

  return { invitations, loading, error, refetch: fetchInvitations };
}