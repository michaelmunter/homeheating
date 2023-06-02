import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useState, useEffect } from "react"
import type { InterimBase_CalcType } from "~/server/calculations/calcModel"

type DataType = {
  results: InterimBase_CalcType
}

export default function Results(results: DataType) {
  const [renderChart, setRenderChart] = useState(false)

  useEffect(() => {
    setRenderChart(true)
  }, [])

  if (!renderChart) {
    return null
  }

  if (results === null) {
    return null
  }
  //console.log("Results: ")
  //console.log(results)

  const renderLineChart = (results: DataType, dataKey: string) => (
    <div>
      <h2 className="text-l p-2 text-center font-bold">{dataKey}</h2>
      <LineChart
        width={600}
        height={300}
        data={results.results.d}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <Line dot={false} type="monotone" dataKey={dataKey} stroke="#82ca9d" />
        <YAxis />

        <XAxis angle={-45} textAnchor="end" interval={50} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <YAxis />
      </LineChart>
    </div>
  )

  return (
    <div className="w-[40rem] ">
      {renderLineChart(results, "Two")}
      {renderLineChart(results, "Qroom")}
    </div>
  )
}
