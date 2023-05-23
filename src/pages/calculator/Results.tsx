import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useState, useEffect } from "react"

const data = [
  { date: "2021-01-01", value: 200 },
  { date: "2021-01-02", value: 400 },
  { date: "2021-01-03", value: 200 },
  { date: "2021-01-04", value: 300 },
  { date: "2021-01-05", value: 1000 },
]

export default function Results() {
  const [renderChart, setRenderChart] = useState(false)

  useEffect(() => {
    setRenderChart(true)
  }, [])

  if (!renderChart) {
    return null
  }

  const renderLineChart = (
    <div className=" text-sm">
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 100,
        }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <YAxis />
      </LineChart>
    </div>
  )

  return (
    <div className="w-52">
      <h1 className="pb-10 text-2xl">Results</h1>
      {renderLineChart}
      <h3 className="py-3 text-2xl">Summary</h3>
      <div className="grid grid-cols-2">
        <label>label</label>
        <label>label</label>
        <label>label</label>
        <label>label</label>
        <label>label</label>
        <label>label</label>
        <label>label</label>
        <label>label</label>
      </div>
    </div>
  )
}
