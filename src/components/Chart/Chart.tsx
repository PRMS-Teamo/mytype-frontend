import {Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import useAnalysis from "../../hooks/useAnalysis.ts";

export default function Chart() {
  const { chartData } = useAnalysis();
  const barWidth = 80;
  const chartWidth = chartData.length * barWidth;

  return (
    /**
     * TODO : width를 어떻게 설정했는진 모르겠으나, 적합한 width로 설정해야합니다.
     * 해당 부분에 대한 이해가 필요한 상황이므로, Layout 설계자분들의 의견을 구합니다.
     *
     * 또, active되었을 때 (hover) 색상 디자인이 필요합니다. 하단 Bar tag 확인해주세요.
     */
    <div className="overflow-x-auto w-[1000px]">
      <div style={{ width: chartWidth }}>
        <BarChart
          width={chartWidth}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
        >
          <XAxis
            dataKey="stackName"
            interval={0}
            angle={0}
            fontSize={12}
          />
          <YAxis
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="demandCount" name="공급" fill="#5932EA" barSize={12} activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="supplyCount" name="수요" fill="#B3B3B3" barSize={12} activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </div>
    </div>
  )
}