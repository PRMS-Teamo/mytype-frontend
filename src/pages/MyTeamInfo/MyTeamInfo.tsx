import Label from "../../components/Label";
import ListItem from "../../components/ListItem/ListItem.tsx";

const MyTeamInfo = () => {
  const teamMateList = [
    "김희영",
    "신혜민",
    "김종현",
    "한지웅",
    "조민우",
  ]; // TODO : 팀원 정보를 받아오는 API 로직 추가가 필요함.
  return (
    <div className="w-full">
      <Label children="팀명"/>
      <ListItem content="마이타입" buttonContent="팀 나가기" onClick={() => console.log('team out')}/>
      <br/>
      <hr/>
      <br/>
      <Label>팀원 정보</Label>
      {teamMateList.map((item) => {
        return (
          <ListItem content={item} buttonContent="메시지 보내기" onClick={() => console.log('test')}/>
        )
      })}
    </div>
  )
}

export default MyTeamInfo;