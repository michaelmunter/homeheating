import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useState, useEffect } from "react"
import { InterimBase_CalcType } from "~/server/calculations/calcModel"

const data = [
  { date: "2021-01-01", value: 200 },
  { date: "2021-01-02", value: 400 },
  { date: "2021-01-03", value: 200 },
  { date: "2021-01-04", value: 300 },
  { date: "2021-01-05", value: 1000 },
]

export default function Results({ results }: any) {
  const [renderChart, setRenderChart] = useState(false)

  useEffect(() => {
    setRenderChart(true)
  }, [])

  if (!renderChart) {
    return null
  }

  if (!results) {
    return null
  }
  console.log("Results: ")
  console.log(results.d)

  const renderLineChart = (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={100}
      minWidth={100}
    >
      <LineChart
        width={500}
        height={400}
        data={results.d}
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <Line
          dot={false}
          type="monotone"
          yAxisId="right"
          dataKey="Qroom"
          stroke="#8884d8"
        />
        <YAxis width={110} yAxisId="right" orientation="right" label="Qroom" />
        <Line
          dot={false}
          type="monotone"
          yAxisId="left"
          dataKey="Two"
          stroke="#82ca9d"
        />
        <YAxis width={90} label="Two" yAxisId="left" orientation="left" />
        <XAxis angle={-45} textAnchor="end" interval={50} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>
  )

  return <div className="w-[45rem] ">{renderLineChart}</div>
}
