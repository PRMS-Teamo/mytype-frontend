import Label from "../../components/Label";
import ListItem from "../../components/ListItem/ListItem.tsx";
import useTeamInfo from "../../hooks/useTeamInfo.ts";
import axios from "axios";
import {useUserStore} from "../../store/userStore.ts";
import {useNavigate} from "react-router-dom";

const MyTeamInfo = () => {
  const { teamInfo, teamMemberInfo } = useTeamInfo();
  const nav = useNavigate();
  const teamTitle = teamInfo?.title;
  const teamId = teamInfo?.teamId;
  const { user } = useUserStore();
  const updateJoin = useUserStore((state) => state.updateJoin)
  const alone = teamMemberInfo.size <= 1;
  const url = !alone ? `${import.meta.env.VITE_BACKEND_URL}/teams/members/${user?.id}/off-board/${teamId}` : `${import.meta.env.VITE_BACKEND_URL}/teams/complete`
  const handleTeamOut = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (alone) {
      try {
        const res = await axios.patch(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        updateJoin(false);
        console.log("####TEAM OUT!####")
        console.log(res)
        console.log("#################")
        nav('/home', {replace: true});
        return res;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        updateJoin(false);
        console.log("####TEAM OUT!####")
        console.log(res)
        console.log("#################")
        nav('/home', {replace: true});
        return res
      } catch (error) {
        console.log(error);
      }
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
              const isMe = item.userId === user?.id;
              return (
                <ListItem key={item.userId} content={item.userName} buttonContent={!isMe ? "메시지 보내기" : ''}
                          onClick={!isMe ? () => console.log("test") : ()=>console.log("나다")
                          }/>
              )
            })}
          </>
      }

    </div>
  )
}

export default MyTeamInfo;