import {useEffect, useState} from "react";
import axios from "axios";

export default function useAnalysis() {
  const [chartData, setChartData] = useState([]);
  const getChartData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/analysis`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setChartData(res.data.analysis)
    } catch (error) {
    }
  }
  useEffect(() => {
    getChartData();
  }, [])

  return {
    chartData,
  }
}