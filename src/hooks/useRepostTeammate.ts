import axios from "axios";

const useRepostTeammate = () => {
  const repostTeammate = async (postId: string) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/bumps`,
        { postId }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("재게시 성공:", response.data);
      alert("프로필이 재게시되었습니다.");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message === "Bump limit exceeded") {
          alert("프로필 재게시 횟수를 초과했습니다. 내일 다시 시도해주세요.");
        } else {
          alert(err.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
        return; 
      }


      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return { repostTeammate };
};

export default useRepostTeammate;