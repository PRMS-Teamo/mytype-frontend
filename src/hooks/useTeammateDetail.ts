import {useParams} from "react-router-dom";
import useTeammate from "./useTeammate.ts";
import {useEffect, useState} from "react";
import type {User} from "../store/userStore.ts";

export default function useTeammateDetail() {
  const { id } = useParams<{ id: string }>();
  const {getTeammateById}=useTeammate()
  const [teammate, setTeammate] = useState<User | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchTeammate = async () => {
      try {
        const data = await getTeammateById(id);
        setTeammate(data);
        console.log(data);
      } catch (err) {
        console.error("개별 팀원 로딩 실패", err);
      }
    };
    fetchTeammate();
  }, [id])

  return {
    teammate
  }
}