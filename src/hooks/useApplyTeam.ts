import axios from "axios";

const useApplyTeam = () => {
  const applyToTeam = async (teamId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/applies/teams/${teamId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("지원 성공:", response.data);
      alert("지원 완료!");
    } catch (err: unknown) {
      let message = "알 수 없는 오류가 발생했습니다.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || "지원 중 오류가 발생했습니다.";
        console.error("AxiosError:", err.response);
      } else {
        console.error("Unknown Error:", err);
      }

      alert(message);
    }
  };

  return { applyToTeam };
};

export default useApplyTeam;