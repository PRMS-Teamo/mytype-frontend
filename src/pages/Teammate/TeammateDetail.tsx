import Content from "../Post/Content.tsx";
import ProjectType from "../Post/ProjectType.tsx";
import useTeammateDetail from "../../hooks/useTeammateDetail.ts";

const TeammateDetail=()=>{
  const { teammate } = useTeammateDetail();
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