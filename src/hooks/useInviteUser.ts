import axios from "axios";

interface InvitePayload {
  message: string;
  apply_status: "SUBMITTED";
  positionId: string;
  action: "INVITE";
}

const useInviteUser = () => {
  const inviteUser = async (userId: string, positionId: string, payload: InvitePayload) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/applies/users/${userId}/invite/${positionId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("초대 성공:", response.data);
      alert("초대 메시지를 전송했습니다.");
    } catch (err: unknown) {
      let message = "알 수 없는 오류가 발생했습니다.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
        console.error("초대 실패:", err.response);
      } else {
        console.error("Unknown Error:", err);
      }
      alert(message);
    }
  };

  return { inviteUser };
};

export default useInviteUser;