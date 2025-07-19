import Label from "../../components/Label";
import ListItem from "../../components/ListItem/ListItem.tsx";
import useTeamInfo from "../../hooks/useTeamInfo.ts";

const MyTeamInfo = () => {
  const myTeamData = useTeamInfo();
  console.log("my team data", myTeamData);
  const teamMateList = [
    "김희영",
    "신혜민",
    "김종현",
    "한지웅",
    "조민우",
  ]; // TODO : 팀원 정보를 받아오는 API 로직 추가가 필요함. 정보가 온다면 하단처럼 옴.
  return (
    <div className="w-full">
      {
        myTeamData === null ?
          <div>소속된 팀이 없습니다.</div> :
          <><Label children="팀명"/>
            <ListItem content="마이타입" buttonContent="팀 나가기" onClick={() => console.log('team out')}/></>
      }
      <br/>
      <hr/>
      <br/>
      {
        myTeamData === null || teamMateList.length === 0 ?
          <div>정보가 없습니다.</div> :
          <>
            <Label>팀원 정보</Label>
            {teamMateList.map((item) => {
              return (
                <ListItem content={item} buttonContent="메시지 보내기" onClick={() => console.log('test')}/>
              )
            })}
          </>
      }

    </div>
  )
}

export default MyTeamInfo;