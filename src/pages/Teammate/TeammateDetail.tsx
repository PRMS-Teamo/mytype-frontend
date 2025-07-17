import {type User} from "../../store/userStore.ts";
import Content from "../Post/Content.tsx";
import ProjectType from "../Post/ProjectType.tsx";
import useTeammate from "../../hooks/useTeammate";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const TeammateDetail=()=>{
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

  if (!teammate) return <div className="m-12">로딩 중...</div>;

  return (
    <div className="border border-gray-300 rounded-lg h-full">
      <div className="m-12">
        <Content post={teammate}/>
        <ProjectType type="teammate" post={teammate} />

      </div>
    </div>
  )
}
export default TeammateDetail;