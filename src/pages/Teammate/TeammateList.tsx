import {useNavigate} from "react-router-dom";

export default function TeammateList () {
  const nave=useNavigate();
  const handlePostClick = () => {
    nave("/findteammate/1")
  }
  return (
    <>
      <div onClick={handlePostClick}>TeammateList Component</div>
    </>
  );
}