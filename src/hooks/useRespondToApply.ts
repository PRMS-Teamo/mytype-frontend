import axios from "axios";

const useRespondToApply = () => {
  const respondToApply = async (
    teamPositionId: string,
    userId: string,
    applyStatus: "SUCCESS" | "REJECTED"
  ) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/applies/${teamPositionId}/${userId}`,
        {
          applyStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("지원 상태 변경 성공:", response.data);
      alert(`지원 상태가 '${applyStatus}'로 변경되었습니다.`);
    } catch (err: unknown) {
      let message = "알 수 없는 오류가 발생했습니다.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || "지원 상태 변경 중 오류가 발생했습니다.";
        console.error("AxiosError:", err.response);
      } else {
        console.error("Unknown Error:", err);
      }

      alert(message);
    }
  };

  return { respondToApply };
};

export default useRespondToApply;