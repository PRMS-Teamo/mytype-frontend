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
  teamId?: string;
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
          if (!item.teamId) return item;

          try {
            const teamDetailRes = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/teams/${item.teamId}`,
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
