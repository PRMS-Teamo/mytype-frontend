import Label from "../../components/Label";
import ListItem from "../../components/ListItem/ListItem.tsx";
import useTeamInfo from "../../hooks/useTeamInfo.ts";
import axios from "axios";
import {useUserStore} from "../../store/userStore.ts";

const MyTeamInfo = () => {
  const { teamInfo, teamMemberInfo } = useTeamInfo();
  const teamTitle = teamInfo?.title;
  const teamId = teamInfo?.teamId;
  const { user } = useUserStore();
  const alone = teamMemberInfo.size <= 1;
  const url = !alone ? `${import.meta.env.VITE_BACKEND_URL}/teams/members/${user?.id}/off-board/${teamId}` : `${import.meta.env.VITE_BACKEND_URL}/teams/complete`
  const handleTeamOut = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (alone) {
      const res = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res;
    } else {
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res
    }
  }
  return (
    <div className="w-full">
      {
        teamInfo === null ?
          <div>소속된 팀이 없습니다.</div> :
          <>
            <Label children="팀명"/>
            <ListItem content={`${teamTitle}`} buttonContent="팀 나가기" onClick={handleTeamOut}/>
          </>
      }
      <br/>
      <hr/>
      <br/>
      {
        teamInfo === null ?
          <div>정보가 없습니다.</div> :
          <>
            <Label>팀원 정보</Label>
            {Array.from(teamMemberInfo).map((item) => {
              return (
                <ListItem key={item.userId} content={item.userName} buttonContent="메시지 보내기" onClick={() => console.log('test')}/>
              )
            })}
          </>
      }

    </div>
  )
}

export default MyTeamInfo;