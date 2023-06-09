import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { useState, useEffect } from "react"
import type { Base } from "~/server/analyzer/analyzer"
import { type } from "os"

type Props = {
  results?: Base
}

export default function Results({ results }: Props) {
  const [renderChart, setRenderChart] = useState(false)

  useEffect(() => {
    setRenderChart(true)
  }, [])

  if (!renderChart) {
    return null
  }

  if (results === null || results === undefined || results.d === undefined) {
    return null
  }
  console.log(results)

  const renderLineChart = (results: Base, dataKey: string) => (
    <div>
      <h2 className="text-l p-2 text-center font-bold">{dataKey}</h2>
      <ResponsiveContainer width="100%" height={200} className="text-sm">
        <LineChart
          data={results.d}
          margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
        >
          <Line
            dot={false}
            type="monotone"
            dataKey={dataKey}
            stroke="#82ca9d"
          />
          <YAxis />

          <XAxis angle={-45} textAnchor="end" interval={50} />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <div>
      <div className="w-full">{renderLineChart(results, "Two")}</div>
      <div className="w-full">{renderLineChart(results, "Qroom")}</div>
    </div>
  )
}

// export default function Results() {
//   return <div></div>
// }
